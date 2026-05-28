const Fs = require("fs");
const Path = require("path");
const fetch = require("node-fetch");
const Article=require("./Article.js");
const Settings = require("./Settings.js");

const marked = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

    async guessAndGet(root, filename, extensions) {
        const get = async function (root, filename, extension, mode) {
            switch (mode) {
                case 2:
                    filename = filename.toLowerCase();
                    extension = extension.toLowerCase();
                    break;
                case 1:
                    filename = filename.toUpperCase();
                    extension = extension.toUpperCase();
                    break;
                case 0:
                    filename = filename.toUpperCase();
                    extension = extension.toLowerCase();
                    break;
                case 3:
                    filename = filename.toLowerCase();
                    filename = filename.charAt(0).toUpperCase() + filename.slice(1);
                    extension = extension.toLowerCase();
                    break;
            }
    
            let url = root + "/" + filename;
            if (extension != "") url += "." + extension;
            const res = await fetch(url, {
                headers: {
                    "User-Agent":"riccardobl-site-generator"
                }
            });
            if (!res.ok) {
                return null;
            }
            return [await res.text(), extension.toLowerCase()];
        }
    
        for (let i in extensions) {
            const ext = extensions[i];
            for (let j = 0; j < 4; j++) {
                const res = await get(root, filename, ext, j);
                if (res) {
                    console.log("Found", filename + "." + ext)
                    return res;
                }
            }
        }
        return null;
    }

    getConfig() {
        const cfg = (((Settings.config || {}).params || {}).githubShowcase || {});
        const owners = Array.isArray(cfg.owners) ? cfg.owners : [];
        const repos = Array.isArray(cfg.repos) ? cfg.repos : [];
        const starredBy = cfg.starredBy || owners[0] || "";
        if (owners.length || repos.length) {
            return { owners, repos, starredBy };
        }

        return {
            owners: Settings.GITHUB_ACCOUNTS.split(",").map((s) => s.trim()).filter(Boolean),
            repos: [],
            starredBy: ""
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
        try {
            const languages = await this.fetchJson("https://api.github.com/repos/" + repo.full_name + "/languages");
            return Object.keys(languages || {}).sort((a, b) => languages[b] - languages[a]);
        } catch (err) {
            console.warn("Could not fetch languages for " + repo.full_name + ": " + err.message);
            return repo.language ? [repo.language] : [];
        }
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

    normalizeRepo(repo) {
        return {
            fullName: repo.full_name,
            name: repo.name,
            owner: repo.owner && repo.owner.login,
            description: repo.description || "",
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            language: repo.language || "",
            languages: Array.isArray(repo.detectedLanguages) && repo.detectedLanguages.length
                ? repo.detectedLanguages
                : (repo.language ? [repo.language] : []),
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
        let result = null;
        try {
            result = await this.collectRepositories();
        } catch (err) {
            const cachePath = Path.join(Settings.ROOTDIR, "data/github_projects.json");
            if (Fs.existsSync(cachePath)) {
                console.warn("GitHub fetch failed, keeping cached project data: " + err.message);
                return;
            }
            throw err;
        }
        const repos = result.repos;
        this.writeData(repos, result.allProjectRepos);

        for (let i in repos) {
            const repo = repos[i];
            console.log("Parse", repo.full_name);
    
            const topics=Array.isArray(repo.topics) ? repo.topics : [];
            const rawUrl = repo.html_url.replace("https://github.com/", "https://raw.githubusercontent.com/") + "/" + repo.default_branch;
            const prettyUrl = repo.html_url + "/blob/" + repo.default_branch;
        
            var firstImg=null;
            let readme = await this.guessAndGet(rawUrl, "README", ["md", "txt", "html", ""]);
            if (readme) {
        
              if (readme[1] == "md") readme[0] = marked.parse(readme[0]);
        
              const dom = JSDOM.fragment("<div>" + readme[0] + "</div>");
              dom.querySelectorAll("a").forEach(function (el) {
                let href = el.getAttribute("href");
                if (!href) return;
                if (href.indexOf("://") == -1) {
                  href = prettyUrl + "/" + href;
                  el.setAttribute("href", href);
                }
              });
              dom.querySelectorAll("img").forEach(function (el) {
                let src = el.getAttribute("src");
                if (!src) return;
                if (src.indexOf("://") == -1) {
                  src = rawUrl + "/" + src;
                  el.setAttribute("src", src);
                }
                if(!firstImg&&
                    // exclude badges
                    !src.startsWith("https://api.travis-ci.org/") 
                    &&!src.startsWith("https://camo.githubusercontent.com/")    
                    &&src.indexOf("badge.svg")==-1
                )firstImg=src;
              });
              firstImg=null;// todo
              readme[0] = dom.firstChild.innerHTML;
        
           
              
              readme= readme[0];
            }
            const tags=[];
            const languages = Array.isArray(repo.detectedLanguages) && repo.detectedLanguages.length
                ? repo.detectedLanguages
                : (repo.language ? [repo.language] : []);
            for (const language of languages) {
                if (language) tags.push(language);
            }
            tags.push("opensource-contrib");
            for(let i in topics){
                if (topics[i]) tags.push( topics[i] );
            }
            if (repo.license && repo.license.key) tags.push(repo.license.key );
            const options={
                title:repo.full_name,
                hidetitle:true,
                summarytitle:repo.full_name,
                date:new Date(repo.updated_at),
                summary:repo.description,
                tags:tags
            };
            if(firstImg)options.cover=firstImg;
            options.githubFullName = repo.full_name;
            options.githubOwner = repo.owner && repo.owner.login;
            options.githubRepo = repo.name;
            options.githubUrl = repo.html_url;
            options.githubStars = repo.stargazers_count || 0;
            options.githubForks = repo.forks_count || 0;
            options.githubHomepage = repo.homepage || "";

            
            const article=new Article(options);
            let body=(readme || "")+`
            <nav  class="h">
               <a rel="noopener noreferrer" href="`+repo.html_url+ `" target="_blank"><i class="fab fa-github"></i> GitHub page</a>
            `;
            if(repo.homepage){
                body+=`
                <a rel="noopener noreferrer" href="`+repo.homepage+ `" target="_blank">
                <i class="fas fa-home"></i> Homepage</a>
                `;
            }
            body+=` </nav>`;
            article.setBody(body);

            article.write(repo.full_name.replace("/", "-"),"oscontrib");
        }

    }
}
