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

    async getTweets(params) {
        return new Promise((resolve, reject) => {
            this.client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        });
    }

    async fetch(user, filters) {
        const params = { screen_name: user };
        try {
            const tweets = await this.getTweets(params);
            for (let i in tweets) {
                const t = tweets[i];
                if (
                    t.user.screen_name != user
                    || t.retweeted
                    || t.in_reply_to_status_id
                    || t.in_reply_to_user_id
                    || t.in_reply_to_screen_name
                ) continue;

                const htags = t["entities"]["hashtags"];
                const media = t["entities"]["media"];
                let found=false;
                for (let j in htags) {
                    if(found)break;
                    for (let k in filters) {
                        if(found)break;
                        if (htags[j].text == filters[k]) {
                            console.log(t);
                            const text = t.text;
                            const date = t.created_at;
                            const url = "https://twitter.com/" + user + "/status/" + t.id_str;
                            const oembedUrl = "https://publish.twitter.com/oembed?omit_script=1&theme=dark&url=" + url;
                            console.log("Fetch", oembedUrl);
                            let embed = await fetch(oembedUrl);
                            embed = await embed.json();
                            console.log(text, date, url, embed);
                            let imgUrl = "";
                            if (media && media.length > 0) {
                                imgUrl = await ImageUtils.getPreviewImage(media[0].media_url_https);
                            }
                            const tags = [];
                            for (let j in filters) {
                                tags.push(filters[j]);
                            }
                            tags.push("twitter");
                            tags.push("misc");
                            const article = new Article({
                                hidetitle: true,
                                date: new Date(date),
                                cover: imgUrl,
                                summary: " ",
                                summarytitle: " ",
                                tags: tags
                            });
                            article.setBody(embed.html);
                            article.write(shaderId, "devlog-twitter")

                            found=true;
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

