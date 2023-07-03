//Reemplazar la funcion init de balam.html por la siguiente:
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("B6F4DC1C4DE12A4798DF7A49CAC40457");
	var lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
  const progressBar = document.getElementById("progress");
  const loadingText = document.body.getElementsByTagName("p")[0];
  loader.on("progress", (e) => {
    let progreso = Math.floor(e.progress * 100);
    progressBar.style.width = `${progreso}%`;
    loadingText.innerHTML = `Cargando... (${progreso}%)`;
  }); 
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	var lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}

//Reemplazar la funcion handleComplete de Balam.html por la siguiente:
function handleComplete(evt,comp) {
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
  const preloaderDiv = document.getElementById("preloader");
  preloaderDiv.style.display = 'none';
  canvas.style.display = 'block';
	exportRoot = new lib.Balam();
	stage = new lib.Stage(canvas);
	stage.enableMouseOver();	
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	AdobeAn.makeResponsive(true,'both',false,1,[canvas,preloaderDiv,anim_container,dom_overlay_container]);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}