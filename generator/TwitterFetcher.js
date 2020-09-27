const fetch = require("node-fetch");
const Article = require("./Article.js");
const Twitter = require('twitter');
const ImageUtils = require("./ImageUtils.js");

module.exports = class {
    constructor(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
        this.client = new Twitter({
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
            access_token_key: accessTokenKey,
            access_token_secret: accessTokenSecret
        });
    }
    async getUser(id) {
        const params={
            id:id
        }
        const resp=await new Promise((resolve, reject) => {
            this.client.get('users/show.json', params, function (error, tweets, response) {
                if (!error) {
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        });
        
        return resp;
    }

    async getTweets(params,tweets) {
        if(!tweets)tweets=[]
        console.log("Request");
        const resp=await new Promise((resolve, reject) => {
            this.client.get('collections/entries.json', params, function (error, tweets, response) {
                if (!error) {
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        });

        for (let k in resp.objects.tweets)    tweets.push(resp.objects.tweets[k]);
        if(resp.response.position.was_truncated){
            params["max_position"]=resp.response.position.min_position;
            await this.getTweets(params,tweets);
        }
     
        return tweets;
    }

    async getEmbedCode(user,t,script){
        const url = "https://twitter.com/" + user.id_str + "/status/" + t.id_str;
        const oembedUrl = "https://publish.twitter.com/oembed?omit_script="+(!script?1:0)+"&theme=dark&url=" + url;
        console.log("Fetch", oembedUrl);
        let embed = await fetch(oembedUrl);
        embed = await embed.json();
        return embed;

    }

    async fetch(collection) {
        const params = { 
            id:collection
        };
        try {
            console.log("Fetch tweets")
            const tweets = await this.getTweets(params);
            console.log("Found",tweets.length,"tweets")

            for (let i in tweets) {                
                const t = tweets[i];
                // if (
                //     t.user.screen_name != user
                //     || t.retweeted
                //     || t.in_reply_to_status_id
                //     || t.in_reply_to_user_id
                //     || t.in_reply_to_screen_name
                // ) continue;

                const htags = t["entities"]["hashtags"];
                const media = t["entities"]["media"];
                // let found=false;
                // for (let j in htags) {
                //     if(found)break;
                //     for (let k in filters) {
                //         if(found)break;
                //         if (htags[j].text == filters[k]) {
                    const user=await this.getUser(t.user.id_str);
                            console.log(t);
                            const text = t.text;
                            const date = t.created_at;
                
                            const embed=await  this.getEmbedCode(user,t,true);
                            // const embedNoScript=await this.getEmbedCode(user,t,false);

                            let imgUrl = "";
                            if (media && media.length > 0) {
                                imgUrl = await ImageUtils.getPreviewImage(media[0].media_url_https);
                            }
                            const tags = [];
                            for (let j in htags) {
                                tags.push(htags[j].text);
                            }
                            tags.push("twitter");
                            tags.push("misc");
                            const article = new Article({
                                hidetitle: true,
                                date: new Date(date),
                                cover: imgUrl,
                                summary: text,
                                tweetUrl: "https://twitter.com/" + user.id_str + "/status/" + t.id_str,
                                summarytitle: " ",
                                author:user.name,
                                tags: tags
                            });
                            article.setBody(embed.html);
                            article.write(t.id_str, "-twitter")

                            // found=true;
                        }
                //     }
                // }
            // }
        } catch (error) {
            console.log(error);
        }
    }
}

