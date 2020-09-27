const fetch = require("node-fetch");
const Article=require("./Article.js");
const ImageUtils=require("./ImageUtils.js");

module.exports=class  {
    constructor(chanId,key){
        this.chanId=chanId;
        this.key=key;
    }

    async getVideos(){
        console.log("Get yt videos for ",this.chanId);
        let nextToken;
        let vids=[];
        do {
            let url="https://www.googleapis.com/youtube/v3/search?key="+this.key+"&channelId="
            +this.chanId+"&part=snippet,id&order=date";
            if(nextToken)url+="&pageToken="+nextToken;

            const data=await fetch(url).then((res)=>res.json());
            console.log(data);
            for(let i in data.items){
                const item=data.items[i];
                nextToken=data.nextPageToken;
                if(!item.id.videoId)continue;
                vids.push({
                    publishedAt:item.snippet.publishedAt,
                    title:item.snippet.title,
                    id:item.id.videoId

                })
            }
        }while(nextToken);

        console.log(vids);
        return vids;
    }
    

    async fetch(){
        try{
            const vids=await this.getVideos();
            for(let i in vids){
                const vid=vids[i];
                const embedUrl= "https://www.youtube-nocookie.com/embed/"+ vid.id
                const article=new Article({
                    title:vid.title,
                    date:vid.publishedAt,
                    ytcover: embedUrl ,
                    summary:" ",
                    summarytitle:" ",
                    tags:[
                        "video",
                        "media",
                        "devlog",
                        "misc"
                    ]
                });
                article.setBody(`
                <br />            
                <iframe width="560" height="315" src="`+embedUrl+`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br /><br />
            `);
            article.write(vid.id,"devlog-yt")
         }
            
        }catch(e){
            console.error("Can't fetch yt video",e);
        }
    }
            

    
}