
const Settings=require("./Settings.js");
const YoutubeFetcher =require("./YoutubeFetcher.js");
const DropboxFetcher =require("./DropboxFetcher.js");
const ShadertoyFetcher =require("./ShadertoyFetcher.js");
const TwitterFetcher =require("./TwitterFetcher.js");
const GithubFetcher =require("./GithubFetcher.js");
const AvatarFetcher =require("./AvatarFetcher.js");
const Fs = require("fs");
const Path = require("path");

async function main() {
    Fs.rmSync(Path.resolve(__dirname, "../content/posts/generated"), {
        recursive: true,
        force: true
    });

    const avatar=new AvatarFetcher();
    avatar.fetch();

    // const dropbox=new DropboxFetcher(Settings.DROPBOX_APIKEY);
    // Settings.DROPBOX_FOLDERS.split(",").forEach((f)=>dropbox.fetch(f));

    // const youtube=new YoutubeFetcher(
    //     Settings.YOUTUBE_CHANNEL,
    //     Settings.YOUTUBE_KEY
    // );
    // youtube.fetch();

    // const shadertoy=new ShadertoyFetcher(
    //     Settings.SHADERTOY_USER,
    //     Settings.SHADERTOY_KEY
    // );
    // shadertoy.fetch();

    // const twitter=new TwitterFetcher(
    //     Settings.TWITTER_CONSUMER_KEY,
    //     Settings.TWITTER_CONSUMER_SECRET,
    //     Settings.TWITTER_ACCESS_TOKEN_KEY,
    //     Settings.TWITTER_ACCESS_TOKEN_SECRET
    // );
    // twitter.fetch(Settings.TWITTER_COLLECTION);

    const github=new GithubFetcher();
    await github.fetch();

}
main();
