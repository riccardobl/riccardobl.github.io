const fetch = require("node-fetch");
const Article = require("./Article.js");
const ImageUtils = require("./ImageUtils.js");

module.exports = class {
    constructor(user, key) {
        this.user = user;
        this.key = key;
    }

    async fetch() {
        console.log("Fetch shadertoy");
        let data = await fetch("https://www.shadertoy.com/api/v1/shaders/query/" + this.user + "?key=" + this.key);
        data = await data.json();

        console.log("Found", data.Shaders, "shaders");

        if (data.Shaders <= 0) return;
        for (let i in data.Results) {
            const shaderId = data.Results[i];

            data = await fetch("https://www.shadertoy.com/api/v1/shaders/" + shaderId + "?key=" + this.key);
            data = await data.json();

            if (data["Error"]) {
                console.error(data);
                return;
            }

            data = data.Shader.info;
            console.log(data);

            const tags = [];
            tags.push("shadertoy");
            for (let j in data.tags) tags.push(data.tags[j]);
            tags.push("devlog");
            tags.push("media");
            tags.push("misc");

            const coverImg=await ImageUtils.getPreviewImage("https://www.shadertoy.com/media/shaders/" + shaderId + ".jpg");
            
            const article = new Article({
                title: data.name,
                date: new Date(parseInt(data.date) * 1000),
                cover: coverImg,
                summary: " ",
                summarytitle: " ",
                tags: tags
            });
            article.setBody(`
                            <br />
                            <iframe width="640" height="360" frameborder="0" 
                            src="https://www.shadertoy.com/embed/`+ shaderId + `?gui=true&t=10&paused=false&muted=false" allowfullscreen></iframe>
                            <br /><br />
                        `+ data.description);
            article.write(shaderId, "shadertoy");
        }
    }
}

