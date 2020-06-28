const fetch = require("node-fetch");
const Article = require("./Article.js");
const Twitter = require('twitter');

module.exports = class {
    constructor(consumerKey,consumerSecret,accessTokenKey,accessTokenSecret) {
        this.client = new Twitter({
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token_key: accessTokenKey,
            access_token_secret: accessTokenSecret
        });
    }

    async fetch(user,filters) {
        const params = {screen_name: user};
        this.client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for( let i in tweets){
                    const t=tweets[i];
                    if(
                        t.user.screen_name!=user
                        ||t.retweeted
                        ||t.in_reply_to_status_id
                        ||t.in_reply_to_user_id
                        ||t.in_reply_to_screen_name
                    )continue;
                    
                    const htags=t["entities"]["hashtags"];
                    const media=t["entities"]["media"];
                    for( let j in htags){
                        for(let k in filters){
                            if(htags[j].text==filters[k]){
                                console.log(t);
                                const text=t.text;
                                const date=t.created_at;
                                const url="https://twitter.com/"+user+"/status/"+t.id_str;
                                const oembedUrl="https://publish.twitter.com/oembed?omit_script=1&theme=dark&url="+url;
                                console.log("Fetch",oembedUrl);
                                fetch(oembedUrl).then(res => {
                                    res.json().then(embed=>{
                                        console.log(text,date,url,embed);
                                        let imgUrl="";
                                        if(media&&media.length>0){
                                            imgUrl=media[0].media_url_https;
                                        }
                                        const tags=[];
                                        for(let j in filters){
                                            tags.push(filters[j]);
                                        }
                                        tags.push("twitter");
                                        tags.push("misc");
                                        const article = new Article({
                                            hidetitle:true,
                                            date: new Date(date),
                                            cover: imgUrl,
                                            summary: " ",
                                            summarytitle: " ",
                                            tags: tags
                                        });
                                        article.setBody(embed.html);
                                        article.write(shaderId, "devlog-twitter")      
                                    });  
                                });                                
                                return;
                            }
                        }        
                    }
    
                }
            }else{
                console.log(error);
            }
          });
    }
}

