function loadGfonts(families, comp) {
    const lib = comp.getLibrary();
    const googleObject = {
        type: "Google",
        loadedFonts: 0,
        totalFonts: families.length,
        callOnLoad: lib.gfontAvailable,
    };

    for(let i = 0; i < families.length; i++) {
        isFontAvailable(gFontsFamilies[i], googleObject);
    }
}

function isFontAvailable(font, obj) {
    const timeOut = 5000;
    const delay = 200;
    let interval = 0;
    let timeElapsed = 0;
    const checkFont = () => {
        const node = document.createElement("span");
        node.innerHTML = "giItT1WQy@!-/#";
        node.style.position = "absolute";
        node.style.left = "-1000px";
        node.style.top = "-1000px";
        node.style.fontSize = "300px";
        node.style.fontFamily = "sans-serif";
        node.style.fontVariant = "normal";
        node.style.fontStyle = "normal";
        node.style.fontWeight = "normal";
        node.style.letterSpacing = "0";
        document.body.appendChild(node);
        const width = node.offsetWidth;
        node.style.fontFamily = `${font},${node.style.fontFamily}`;
        let flag = false;
        if((node && node.offsetWidth != width) || timeElapsed >= timeOut) {
            obj.loadedFonts++;
            if(interval) clearInterval(interval);
            obj.callOnLoad(font, obj.totalFonts);
            flag = true;
        }
        if(node) {
            node.parentNode.removeChild(node);
            node = null;
        }
        timeElapsed += delay;
        return flag;
    }

    if(!checkFont()) {
        interval = setInterval(checkFont, delay);
    }
}


