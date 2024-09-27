
function setSticky(el,v){
    if(v){ 
        let d=el.getBoundingClientRect().top+window.scrollY;
        let boardDistanceFromTop=Number(el.getAttribute("sticky-r-base-pos")||d);

        el.setAttribute("sticky-r-base-pos",boardDistanceFromTop);

        if(!el.getAttribute("sticky-r-width")){
            el.setAttribute("sticky-r-width",el.style.width);
        }
        if(!el.getAttribute("sticky-r-height")){
            el.setAttribute("sticky-r-height",el.style.height);
        }
        el.style.width=el.clientWidth+"px";
        el.style.height=el.clientHeight+"px";
        
        el.classList.add("sticky");
    }else{
        el.classList.remove("sticky");
        el.style.width=el.getAttribute("sticky-r-width");
        el.style.height=el.getAttribute("sticky-r-height");
        el.removeAttribute("sticky-r-width");
        el.removeAttribute("sticky-r-height");
        el.removeAttribute("sticky-r-base-pos");
    }
}

function autoSticky(el){
    let d=el.getBoundingClientRect().top+window.scrollY;
    let dd=window.scrollY;
    let boardDistanceFromTop=Number(el.getAttribute("sticky-r-base-pos")||d);
    setSticky(el,dd>boardDistanceFromTop);
}


function handleImageZoom() {
    const images = document.querySelectorAll("article img");

    images.forEach((img) => {
        img.addEventListener("click", function () {
            // Create the fullscreen overlay div
            const overlay = document.createElement('div');
            overlay.classList.add('fullscreen-overlay');
            overlay.style.backgroundImage = `url(${img.src})`;

            // Create the close button
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.innerText = 'X';
            closeButton.addEventListener('click', function () {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                overlay.remove();
            });



            // Append the close button to the overlay
            overlay.appendChild(closeButton);

            // Append the overlay to the body
            document.body.appendChild(overlay);

            // Show the overlay
            overlay.style.display = 'block';

            // Request fullscreen for the overlay
            if (overlay.requestFullscreen) {
                overlay.requestFullscreen();
            } else if (overlay.mozRequestFullScreen) { // Firefox
                overlay.mozRequestFullScreen();
            } else if (overlay.webkitRequestFullscreen) { // Chrome, Safari and Opera
                overlay.webkitRequestFullscreen();
            } else if (overlay.msRequestFullscreen) { // IE/Edge
                overlay.msRequestFullscreen();
            }

            let scale = 1;
            let isPanning = false;
            let startX = 0;
            let startY = 0;
            let originX = 0;
            let originY = 0;
            let moved = false;
            const moveThreshold = 10; // Threshold for detecting movement

            // Handle zooming on click
            overlay.addEventListener('click', function (event) {
                if (event.target !== closeButton && !moved) {
                    if (scale === 1) {
                        scale = 1.5;
                    } else if (scale === 1.5) {
                        scale = 2;
                    } else {
                        scale = 1;
                    }
                    overlay.style.backgroundSize = `${scale * 100}%`;
                }
                moved = false; // Reset moved flag after click
            });

            // Handle panning
            overlay.addEventListener('mousedown', function (event) {
                isPanning = true;
                startX = event.clientX;
                startY = event.clientY;
                // Set initial background position based on mouse position
                if (!overlay.style.backgroundPositionX) {
                    overlay.style.backgroundPositionX = `${startX}px`;
                    overlay.style.backgroundPositionY = `${startY}px`;
                }
                originX = parseInt(overlay.style.backgroundPositionX || 0);
                originY = parseInt(overlay.style.backgroundPositionY || 0);
                moved = false; // Reset moved flag on mousedown
            });

            overlay.addEventListener('mousemove', function (event) {
                if (isPanning) {
                    const deltaX = event.clientX - startX;
                    const deltaY = event.clientY - startY;
                    if (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold) {
                        moved = true; // Set moved flag if movement exceeds threshold
                    }
                    overlay.style.backgroundPositionX = `${originX + deltaX}px`;
                    overlay.style.backgroundPositionY = `${originY + deltaY}px`;
                }
            });

            overlay.addEventListener('mouseup', function () {
                isPanning = false;
            });

            overlay.addEventListener('mouseleave', function () {
                isPanning = false;
            });
        });
    });
}

async function main(){
    handleImageZoom();
    const toTop=document.getElementById("toTop");
    if(toTop){
        window.addEventListener("resize",function(){
            setSticky(toTop,false);
            autoSticky(toTop);   
        })
        
        window.addEventListener("scroll",function(){
            autoSticky(toTop);   
        });

        toTop.addEventListener("click",function(){
            // smooth scroll
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
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
    main();
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
