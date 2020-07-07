const Path=require("path");
const Toml = require('toml');
const Fs=require("fs");
const Settings={
    DROPBOX_APIKEY:"",
    DROPBOX_FOLDERS:"",
    YOUTUBE_CHANNEL:"",
    YOUTUBE_KEY:"",
    SHADERTOY_USER:"",
    SHADERTOY_KEY:"",
    TWITTER_CONSUMER_KEY:"",
    TWITTER_CONSUMER_SECRET:"",
    TWITTER_ACCESS_TOKEN_KEY:"",
    TWITTER_ACCESS_TOKEN_SECRET:"",
    TWITTER_USER:"",
    TWITTER_FILTER:"",
    GITHUB_ACCOUNTS:"",
    IMAGE_PREVIEWS_MAX_SIZE:2048, // deprecated
    OPTIMIZED_IMAGE_MAX_SIZE:2048,
    IMAGE_PREVIEWS_FORMAT:"webp",
    OPTIMIZED_IMAGE_FORMAT:"webp'",
    ROOTDIR:Path.resolve(__dirname,"../"),
    config:{}
}

for(let k in Settings){
    if(k==="config")continue;
    if(process.env[k]) Settings[k]=process.env[k];    
}


const sitecfg=Fs.readFileSync(Path.join(Settings.ROOTDIR,"config.toml"),"utf-8");
Settings.config=Toml.parse(sitecfg);

module.exports=Settings;
