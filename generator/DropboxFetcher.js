const fetch = require("node-fetch");
const Dropbox=require("dropbox").Dropbox;
const Article=require("./Article.js");

module.exports=class DropboxFetcher {
    constructor(token){
        this.dbx = new Dropbox({fetch:fetch, accessToken: token });
    }

    async _list(path,out){
        console.log("List path",path);
        let res=await this.dbx.filesListFolder({path:path});
        if(res){        
            res=res.entries;
            for(let i in res){
                const e=res[i];
                if(e[".tag"]=="folder"){
                    console.log("Found folder",e.id);
                    await this._list(e.id,out);
                    continue;
                }
                // console.log(e);
                const name=e.name;
                const hash=e.content_hash;
                const fpath=e.path_display;
                const shareLink=await this.dbx.sharingCreateSharedLink({
                    path: e.path_lower                  
                });
                let url=shareLink.url;
                url=url.substring(0,url.length-1)+1;

                let date;
                try{
                    date = name.substring(name.indexOf("from ") + "from ".length);
                    date = date.substring(0, date.indexOf("."));
                    date = date.split(" ");
                    date = date[0] + "T" + date[1].replace(/\-/gi, ":");
                    date += "+02:00";
                    if(date&&date!="")date=new Date(date);
                }catch(e){
                    date=null;
                }
                if(!date)date=new Date(e.client_modified);
                // console.log(name);
                // console.log(date);
                // console.log(hash);
                // console.log(url);
                console.log(url);
                out.push( {path:fpath,name:name,date:date,hash:hash,url:url});
                
            } 
        }
        return out;
    }
    async list(path){
        if(!path.endsWith("/"))path+="/";
        let out=[];
        (await this._list('',out));
        return out.filter(e=>e.path.startsWith(path));

    }

    async fetch(tag){
        try{
            
            let res=await this.list("/"+tag+"/");
            console.log(res);
            res.forEach(e=>{
                if(e.path.endsWith(".png")||e.path.endsWith(".jpg")){
                    const article=new Article({
                            title:e.name,
                            hidetitle:false,
                            date:e.date,
                            cover:e.url,
                            summary:" ",
                            summarytitle:" ",
                            tags:[
                                "screenshot",
                                tag,
                                "misc"
                            ]

                        });
                    article.setBody(`
                        <br />
                        <p style="text-align:center">
                        <a href="`+ e.url + `"><img style="max-width:100%;" src="`+ e.url + `"  /></a>
                        </p>
                    `);
                    article.write(e.hash,"devlog-img")
                }
            });

        }catch(e){
            console.error("Cannot fetch dropbox",e);
        }


    }
}