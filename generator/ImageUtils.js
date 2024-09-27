const Settings=require("./Settings.js");
const Path=require("path");
const sharp = require('sharp');
const fetch = require("node-fetch");
const Fs=require("fs");
const Crypto = require('crypto');

const ImageUtils={

    getPreviewBuffer:async function(url,scale){// deprecated
        return this.getOptimizedBuffer(url,scale);
    },

    getPreviewImage:async function(url,scale){// deprecated
        return this.getOptimizedmage(url,scale);
    },

    getOptimizedBuffer:async function(url,scale,format){
        if(!scale)scale=Settings.OPTIMIZED_IMAGE_MAX_SIZE;
        if(!format)format=Settings.OPTIMIZED_IMAGE_FORMAT;
        if(!format)format=Settings.IMAGE_PREVIEWS_FORMAT;
        let res=await fetch(url);
        res=await  res.buffer();
        return await sharp( res )
            .resize({
                width:scale,
                fit:'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }


            })
            .toFormat(format).toBuffer();   
    },

    getOptimizedmage:async function(url,scale,destFile){
        let fileExt=null;
        let relFolder=null;
        let fileName=null;

        if(destFile){
            if(destFile.startsWith("/"))destFile=destFile.substring(1);
            relFolder=Path.dirname(destFile);
            fileName=Path.basename(destFile);
            fileExt=Path.extname(destFile).substring(1);
        }

        if(!fileExt)fileExt=Settings.OPTIMIZED_IMAGE_FORMAT;
        if(!fileExt)fileExt=Settings.IMAGE_PREVIEWS_FORMAT;

        if(!fileName)fileName=Crypto.createHash('sha1').update(url).digest('hex')+"."+fileExt;
        
        if(!relFolder) relFolder="images/generated/preview";

        const relFile=relFolder+"/"+fileName;

        const absFolder=Path.resolve(Settings.ROOTDIR,"static",relFolder);
        Fs.mkdirSync(absFolder, { recursive: true });

        const absFile=Path.resolve(Settings.ROOTDIR,"static",relFile);

        console.log("Save",url,"preview in ",absFile,"(",relFile,")");

        const data=await ImageUtils.getOptimizedBuffer(url,scale,fileExt);
        Fs.writeFileSync(absFile,data);


        return "/"+relFile;
    }
}

module.exports=ImageUtils;
