const Path=require("path");
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
    IMAGE_PREVIEWS_MAX_SIZE:512,
    IMAGE_PREVIEWS_FORMAT:"webp",
    ROOTDIR:Path.resolve(__dirname,"../")
}

for(let k in Settings){
    if(process.env[k]) Settings[k]=process.env[k];    
}

module.exports=Settings;
