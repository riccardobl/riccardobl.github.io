const fetch = require("node-fetch");
const ImageUtils=require("./ImageUtils.js");
const Settings=require("./Settings.js");

module.exports=class AvatarFetcher {
    constructor(){
    }

    async fetch(tag){
        return ImageUtils.getOptimizedmage(Settings.config.params.avatar
            ,1024,Settings.config.params.avatarCache);
    }
}