
window.addEventListener("load", function () {
    const toggleContent = document.querySelectorAll(".toggleContent");
    toggleContent.forEach((el) => {
        el.addEventListener("click", (ev) => {
            const parent = ev.target.parentNode;
            if (!parent.classList.contains("toggleContentOn")) {
                console.log("Show content for ", parent);
                parent.classList.add("toggleContentOn");
                parent.classList.remove("toggleContentOff");

            } else {
                console.log("Hide content for ", parent);
                parent.classList.remove("toggleContentOn");
                parent.classList.add("toggleContentOff");
            }
        });

    });
});


(function (x) {
    var o = x.prototype;
    o.after || (o.after = function () { var e, m = arguments, l = m.length, i = 0, t = this, p = t.parentNode, n = Node, s = String, d = document; if (p !== null) { while (i < l) { ((e = m[i]) instanceof n) ? (((t = t.nextSibling) !== null) ? p.insertBefore(e, t) : p.appendChild(e)) : p.appendChild(d.createTextNode(s(e))); ++i; } } });
}(Element));

// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md
(function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('before')) {
        return;
      }
      Object.defineProperty(item, 'before', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function before() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.parentNode.insertBefore(docFrag, this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype])

const Utils = {
    embedContent: function (options) {
        const p = document.getElementById(options.iframeId);
        p.classList.add("emebeddedContent");
        
        const desc=p.previousElementSibling;
        if(desc&&desc.tagName=="P"){
            desc.style.textAlign="center";
        }


        const resizeIframe = function () {
            const h = p.clientWidth * 0.56;
            p.height = h;
            console.log("Resize", options.iframeId, " height to", h);
        };

        window.addEventListener("resize", function () {
            resizeIframe();
        });
        
        window.addEventListener("load", function () {
            resizeIframe();
            setTimeout(function () {
                p.src = options.embedUrl;
            }, 1000);
        });
        
        



        const ctrls = document.createElement("nav");
        ctrls.classList.add("h");

        const appendCtrl = function (el) {
            // if (ctrls.innerHTML != "") {
            //     ctrls.innerHTML += " | ";
            // }
            ctrls.append(el);
        };
        
        if (options.sourceUrl) {
            const a = document.createElement("a");
            a.setAttribute("rel", "noopener noreferrer");
            a.setAttribute("target", "_blank");
            a.setAttribute("href", options.sourceUrl);
            a.innerHTML = '<i class="fab fa-github"></i> Source';
            appendCtrl(a);
        }
        if (options.fullscreenUrl) {
            const a = document.createElement("a");
            a.setAttribute("rel", "noopener noreferrer");
            a.setAttribute("href", options.fullscreenUrl);
            a.innerHTML = '<i class="fas fa-expand"></i> Fullscreen</a>';
            appendCtrl(a);
        }
        // ctrls.querySelectorAll("a").forEach((el) => {
        //     el.style.padding = "2rem";
        //     el.style.whiteSpace="nowrap";
        //     el.style.display="inline-block";
        //     el.style.margin="1rem";
        //     el.style.padding="0rem";
        // });
        // ctrls.style.textAlign = "center";

        p.before(ctrls);

    }
}


let PROGRESS_BAR_INTERVAL=null;
window.addEventListener("load", function () {
    document.getElementById("pageLoadingProgress").style.display="none";
    if(PROGRESS_BAR_INTERVAL){
        clearInterval(PROGRESS_BAR_INTERVAL);
        PROGRESS_BAR_INTERVAL=null;
    }
});



PROGRESS_BAR_INTERVAL=setInterval(function(){
    const bar=document.getElementById("pageLoadingProgress");
    if(!bar)return;
    bar.value+=1;
    if(bar.value>=bar.max) bar.value=0;    
},20);
