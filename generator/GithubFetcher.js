const fetch = require("node-fetch");
const Article=require("./Article.js");

const marked = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports=class DropboxFetcher {
    constructor(){
    }
    async guessAndGet(root, filename, extensions) {
        const get = async function (root, filename, extension, mode) {
            switch (mode) {
                case 2:
                    filename = filename.toLowerCase();
                    extension = extension.toLowerCase();
                    break;
                case 1:
                    filename = filename.toUpperCase();
                    extension = extension.toUpperCase();
                    break;
                case 0:
                    filename = filename.toUpperCase();
                    extension = extension.toLowerCase();
                    break;
                case 3:
                    filename = filename.toLowerCase();
                    filename = filename.charAt(0).toUpperCase() + filename.slice(1);
                    extension = extension.toLowerCase();
                    break;
            }
    
            let url = root + "/" + filename;
            if (extension != "") url += "." + extension;
            const res = await fetch(url);
            if (!res.ok) {
                return null;
            }
            return [await res.text(), extension.toLowerCase()];
        }
    
        for (let i in extensions) {
            const ext = extensions[i];
            for (let j = 0; j < 4; j++) {
                const res = await get(root, filename, ext, j);
                if (res) {
                    console.log("Found ", filename, ext)
                    return res;
                }
            }
        }
        return null;
    }
    

    async fetch(user){
        const repos=[];
        for(let p=0;;p++){
            const url="https://api.github.com/users/" + user + "/repos?page="+p;
            console.log("Fetch",url);
            const page = await fetch(url,{
                headers:{
                    "Accept":"application/vnd.github.mercy-preview+json"
                }
            }).then(res => res.json());
            console.log(page);
            if(page.length==0)break;
            if(!page[0]){
                console.log("Stop",page);                
                break;
            }
            for(let i in page)repos.push(page[i]);
        }
        for (let i in repos) {
            const repo = repos[i];
            console.log("Parse",repo);
    
            const topics=repo.topics;
            if (repo.fork || repo.archived || !repo.description ||topics.length==0) continue;
            const rawUrl = repo.html_url.replace("https://github.com/", "https://raw.githubusercontent.com/") + "/" + repo.default_branch;
            const prettyUrl = repo.html_url + "/blob/" + repo.default_branch;
        
            var firstImg=null;
            let readme = await this.guessAndGet(rawUrl, "README", ["md", "txt", "html", ""]);
            if (readme) {
        
              if (readme[1] == "md") readme[0] = marked.parse(readme[0]);
        
              const dom = JSDOM.fragment("<div>" + readme[0] + "</div>");
              dom.querySelectorAll("a").forEach(function (el) {
                let href = el.getAttribute("href");
                console.log(href);
                if (href.indexOf("://") == -1) {
                  console.log("Found relative url", href);
                  href = prettyUrl + "/" + href;
                  el.setAttribute("href", href);
                  console.log("Make absolute", href);
                }
              });
              dom.querySelectorAll("img").forEach(function (el) {
                let src = el.getAttribute("src");
                if (src.indexOf("://") == -1) {
                  src = rawUrl + "/" + src;
                  console.log("Found relative url", src);
                  el.setAttribute("src", src);
                  console.log("Make absolute", src);
                }
                if(!firstImg&&
                    // exclude badges
                    !src.startsWith("https://api.travis-ci.org/") 
                    &&!src.startsWith("https://camo.githubusercontent.com/")    
                    &&src.indexOf("badge.svg")==-1
                )firstImg=src;
              });
              firstImg=null;// todo
              readme[0] = dom.firstChild.innerHTML;
        
           
              
              readme= readme[0];
            }
            const tags=[];
            tags.push(repo.language);
            tags.push("opensource-contrib");
            for(let i in topics){
                tags.push( topics[i] );
            }
            if (repo.license && repo.license.key) tags.push(repo.license.key );
            const options={
                title:repo.name,
                hidetitle:true,
                summarytitle:repo.name,
                date:new Date(repo.updated_at),
                summary:repo.description,
                tags:tags
            };
            if(firstImg)options.cover=firstImg;

            
            const article=new Article(options);
            let body=readme+`
            <nav  class="h">
               <a rel="noopener noreferrer" href="`+repo.html_url+ `" target="_blank"><i class="fab fa-github"></i> Github page</a>
            `;
            console.log("Home page",repo.homepage);
            if(repo.homepage){
                body+=`
                <a rel="noopener noreferrer" href="`+repo.homepage+ `" target="_blank">
                <i class="fas fa-home"></i> Homepage</a>
                `;
            }
            body+=` </nav>`;
            article.setBody(body);

            article.write(user+"-"+repo.name,"oscontrib");
        }

    }
}