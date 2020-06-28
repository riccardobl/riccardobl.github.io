

const YoutubeFetcher =require("./YoutubeFetcher.js");
const DropboxFetcher =require("./DropboxFetcher.js");
const ShadertoyFetcher =require("./ShadertoyFetcher.js");
const TwitterFetcher =require("./TwitterFetcher.js");
const GithubFetcher =require("./GithubFetcher.js");

async function main() {

    const dropbox=new DropboxFetcher(process.env.DROPBOX_APIKEY);
    process.env.DROPBOX_FOLDERS.split(",").forEach((f)=>dropbox.fetch(f));

    const youtube=new YoutubeFetcher(
        process.env.YOUTUBE_CHANNEL,
        process.env.YOUTUBE_KEY
    );
    youtube.fetch();

    const shadertoy=new ShadertoyFetcher(
        process.env.SHADERTOY_USER,
        process.env.SHADERTOY_KEY
    );
    shadertoy.fetch();

    const twitter=new TwitterFetcher(
        process.env.TWITTER_CONSUMER_KEY,
        process.env.TWITTER_CONSUMER_SECRET,
        process.env.TWITTER_ACCESS_TOKEN_KEY,
        process.env.TWITTER_ACCESS_TOKEN_SECRET
    );
    twitter.fetch(process.env.TWITTER_USER, process.env.TWITTER_FILTER.split(","));

    const github=new GithubFetcher();
    process.env.GITHUB_ACCOUNTS.split(",").forEach((a)=>github.fetch(a));

}
main();