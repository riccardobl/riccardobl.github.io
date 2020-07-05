
const Settings=require("./Settings.js");
const YoutubeFetcher =require("./YoutubeFetcher.js");
const DropboxFetcher =require("./DropboxFetcher.js");
const ShadertoyFetcher =require("./ShadertoyFetcher.js");
const TwitterFetcher =require("./TwitterFetcher.js");
const GithubFetcher =require("./GithubFetcher.js");

async function main() {

    const dropbox=new DropboxFetcher(Settings.DROPBOX_APIKEY);
    Settings.DROPBOX_FOLDERS.split(",").forEach((f)=>dropbox.fetch(f));

    const youtube=new YoutubeFetcher(
        Settings.YOUTUBE_CHANNEL,
        Settings.YOUTUBE_KEY
    );
    youtube.fetch();

    const shadertoy=new ShadertoyFetcher(
        Settings.SHADERTOY_USER,
        Settings.SHADERTOY_KEY
    );
    shadertoy.fetch();

    const twitter=new TwitterFetcher(
        Settings.TWITTER_CONSUMER_KEY,
        Settings.TWITTER_CONSUMER_SECRET,
        Settings.TWITTER_ACCESS_TOKEN_KEY,
        Settings.TWITTER_ACCESS_TOKEN_SECRET
    );
    twitter.fetch(Settings.TWITTER_USER, Settings.TWITTER_FILTER.split(","));

    const github=new GithubFetcher();
    Settings.GITHUB_ACCOUNTS.split(",").forEach((a)=>github.fetch(a));

}
main();