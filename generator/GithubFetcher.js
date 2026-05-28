const Fs = require("fs");
const Path = require("path");
const fetch = require("node-fetch");
const Settings = require("./Settings.js");

module.exports=class GithubFetcher {
    constructor(){
        this.headers = {
            "Accept":"application/vnd.github.mercy-preview+json",
            "User-Agent":"riccardobl-site-generator"
        };
        if (process.env.GITHUB_TOKEN) {
            this.headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;
        }
    }

    async fetchJson(url) {
        console.log("Fetch", url);
        const res = await fetch(url, { headers: this.headers });
        const body = await res.text();
        let json = null;
        try {
            json = JSON.parse(body);
        } catch (err) {
            throw new Error("Invalid GitHub response from " + url + ": " + body.slice(0, 200));
        }
        if (!res.ok) {
            throw new Error("GitHub request failed for " + url + ": " + (json.message || res.statusText));
        }
        return json;
    }

    getConfig() {
        const cfg = (((Settings.config || {}).params || {}).githubShowcase || {});
        const owners = Array.isArray(cfg.owners) ? cfg.owners : [];
        const repos = Array.isArray(cfg.repos) ? cfg.repos : [];
        const starredBy = cfg.starredBy || owners[0] || "";
        const ignoredLanguages = Array.isArray(cfg.ignoredLanguages) ? cfg.ignoredLanguages : [];
        if (owners.length || repos.length) {
            return { owners, repos, starredBy, ignoredLanguages };
        }

        return {
            owners: Settings.GITHUB_ACCOUNTS.split(",").map((s) => s.trim()).filter(Boolean),
            repos: [],
            starredBy: "",
            ignoredLanguages
        };
    }

    async fetchOwner(owner) {
        const repos = [];
        for (let pageNumber = 1;; pageNumber++) {
            const url = "https://api.github.com/users/" + owner + "/repos?per_page=100&type=owner&sort=updated&page=" + pageNumber;
            const page = await this.fetchJson(url);
            if (!Array.isArray(page) || page.length === 0) break;
            repos.push(...page.map((repo) => ({ repo, explicit: false })));
        }
        return repos;
    }

    async fetchRepo(fullName) {
        const repo = await this.fetchJson("https://api.github.com/repos/" + fullName);
        return { repo, explicit: true };
    }

    async fetchLanguages(repo) {
        if (!repo || !repo.full_name) return [];
        const languages = await this.fetchJson("https://api.github.com/repos/" + repo.full_name + "/languages");
        return Object.keys(languages || {}).sort((a, b) => languages[b] - languages[a]);
    }

    async fetchStarredBy(username) {
        const starred = new Set();
        if (!username) return starred;

        for (let pageNumber = 1;; pageNumber++) {
            const url = "https://api.github.com/users/" + username + "/starred?per_page=100&page=" + pageNumber;
            const page = await this.fetchJson(url);
            if (!Array.isArray(page) || page.length === 0) break;
            for (const repo of page) {
                if (repo && repo.full_name) {
                    starred.add(repo.full_name.toLowerCase());
                }
            }
        }
        return starred;
    }

    shouldInclude(repo, explicit, starredByUser) {
        if (!repo || repo.private || repo.disabled) return false;
        if (repo.fork && !starredByUser) return false;
        if (explicit) return true;
        if (starredByUser) return true;
        return false;
    }

    getIgnoredLanguages() {
        return new Set(this.getConfig().ignoredLanguages || []);
    }

    filterLanguages(languages) {
        const ignoredLanguages = this.getIgnoredLanguages();
        return (languages || []).filter((language) => language && !ignoredLanguages.has(language));
    }

    normalizeRepo(repo) {
        const detectedLanguages = Array.isArray(repo.detectedLanguages) ? repo.detectedLanguages : [];
        const languages = this.filterLanguages(detectedLanguages);
        return {
            fullName: repo.full_name,
            name: repo.name,
            owner: repo.owner && repo.owner.login,
            description: repo.description || "",
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            language: languages[0] || "",
            languages,
            topics: Array.isArray(repo.topics) ? repo.topics : [],
            license: repo.license && repo.license.key ? repo.license.key : "",
            url: repo.html_url,
            homepage: repo.homepage || "",
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            defaultBranch: repo.default_branch,
            fork: !!repo.fork,
            archived: !!repo.archived,
            sizeKb: repo.size || 0
        };
    }

    async collectRepositories() {
        const cfg = this.getConfig();
        const byFullName = new Map();
        const allRepos = new Map();
        const starredRepos = await this.fetchStarredBy(cfg.starredBy);
        for (const owner of cfg.owners) {
            const ownerRepos = await this.fetchOwner(owner);
            for (const item of ownerRepos) {
                allRepos.set(item.repo.full_name.toLowerCase(), item.repo);
                const starredByUser = starredRepos.has(item.repo.full_name.toLowerCase());
                if (this.shouldInclude(item.repo, item.explicit, starredByUser)) {
                    item.starredByUser = starredByUser;
                    byFullName.set(item.repo.full_name.toLowerCase(), item);
                }
            }
        }

        for (const fullName of cfg.repos) {
            const item = await this.fetchRepo(fullName);
            allRepos.set(item.repo.full_name.toLowerCase(), item.repo);
            const starredByUser = starredRepos.has(item.repo.full_name.toLowerCase());
            if (this.shouldInclude(item.repo, item.explicit, starredByUser)) {
                item.starredByUser = starredByUser;
                byFullName.set(item.repo.full_name.toLowerCase(), item);
            }
        }

        const repos = Array.from(byFullName.values())
            .map((item) => item.repo)
            .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at));
        for (const repo of repos) {
            repo.detectedLanguages = await this.fetchLanguages(repo);
        }
        const allProjectRepos = Array.from(allRepos.values())
            .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at));
        for (const repo of allProjectRepos) {
            repo.detectedLanguages = await this.fetchLanguages(repo);
        }
        return { repos, allProjectRepos };
    }

    writeData(repos, allProjectRepos) {
        const normalized = repos.map((repo) => this.normalizeRepo(repo));
        const normalizedAllRepos = (allProjectRepos || repos).map((repo) => this.normalizeRepo(repo));
        const languages = Array.from(new Set(normalizedAllRepos.flatMap((repo) => repo.languages || []))).sort();
        const data = {
            generatedAt: new Date().toJSON(),
            projectCount: normalized.length,
            totalProjectCount: normalizedAllRepos.length,
            totalStars: normalizedAllRepos.reduce((sum, repo) => sum + repo.stars, 0),
            totalLanguages: languages.length,
            languages,
            repositories: normalized
        };

        const dataDir = Path.join(Settings.ROOTDIR, "data");
        Fs.mkdirSync(dataDir, { recursive: true });
        Fs.writeFileSync(
            Path.join(dataDir, "github_projects.json"),
            JSON.stringify(data, null, 2)
        );
    }

    async fetch(){
        const result = await this.collectRepositories();
        const repos = result.repos;
        this.writeData(repos, result.allProjectRepos);
    }
}
