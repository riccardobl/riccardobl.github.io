const Fs=require("fs");
const mkdirp = require('mkdirp');
module.exports=class Article {
    
    constructor(options){
        this.options={
            title:"",
            date: new Date(),
            // ytcover:"",
            // cover:"",
            hidetitle:false,

            tags:[],
            draft:false,
            type:"posts",
            layout:"post"
            // summary:"",
            // summarytitle:""
        };
        for(let k in options){
            this.options[k]=options[k];
        }
        this.body="";
    }
    setBody(body){
        this.body=body;
    }

    generateHtml(){
        var html = "---\n";
        const add=(option)=>{
            const v=this.options[option];
            if(typeof v!="undefined"){
                html+=option+": ";
                const parseV=(v)=>{
                    if(v instanceof Date){
                        return v.toJSON();
                    }else  if(typeof v === 'string' || v instanceof String){
                        v=v.replace(/"/g,"&quot;")
                        return '"'+v+'"';
                    }else{
                        return v;
                    }
                };
                if(Array.isArray(v)){
                    html+="\n";
                    for(let i in v){
                        html += "    - "+parseV(v[i])+"\n";
                    }
                }else{
                    html+=parseV(v)+"\n";
                }             
            }            
        };       
        for(let k in this.options){
            add(k);
        }
        html += "\n---\n";
        html+=this.body;
        return html;
    }

    write(uid,typesuffix){
        const root="content/posts/generated/";
        mkdirp.sync(root);
        Fs.writeFileSync(root + uid + "-"+typesuffix+".html", this.generateHtml());
    }
}