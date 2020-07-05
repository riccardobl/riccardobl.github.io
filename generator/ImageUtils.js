const Settings=require("./Settings.js");
const Path=require("path");
const sharp = require('sharp');
const fetch = require("node-fetch");
const Fs=require("fs");
const Crypto = require('crypto');

const ImageUtils={


    getPreviewBuffer:async function(url,scale){
        if(!scale)scale=Settings.IMAGE_PREVIEWS_MAX_SIZE;
        let res=await fetch(url);
        res=await  res.buffer();
        return await sharp( res )
            .resize({
                width:scale,
                fit:'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }


            })
            .toFormat(Settings.IMAGE_PREVIEWS_FORMAT).toBuffer();   
    },

    getPreviewImage:async function(url,scale){
        const relFolder="images/generated/preview";
        const relFile=relFolder+"/"+Crypto.createHash('sha1').update(url).digest('hex')+"."+Settings.IMAGE_PREVIEWS_FORMAT;

        const absFolder=Path.resolve(Settings.ROOTDIR,"static",relFolder);
        console.log("mkdir recursive",absFolder);
        Fs.mkdirSync(absFolder, { recursive: true });

        const absFile=Path.resolve(Settings.ROOTDIR,"static",relFile);


        // const destFile=Path.resolve(destPath,);
        console.log("Save",url,"preview in ",absFile,"(",relFile,")");

        const data=await ImageUtils.getPreviewBuffer(url,scale);
        Fs.writeFileSync(absFile,data);


        return "/"+relFile;
    }
}

module.exports=ImageUtils;
