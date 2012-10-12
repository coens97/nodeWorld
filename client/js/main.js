/*******************************
 * main.js
 * Especily for initilising canvas and create eventlisteners
 ******************************/
 requirejs(['game']);
var c,//canvas element
    ctx,//canvas 2d content to draw in
    windowWidth,//width of canvas
    windowHeight;//height of canvas

init();

function onMainClick(e){
    
}

function init(){
    c = document.getElementById("myCanvas");//get canvas
    resizeCanvas();
    ctx = c.getContext("2d");
    //add eventlisteners for click or touch
    if ('ontouchstart' in document.documentElement) {//check if it has touchscreen
        c.addEventListener("touchstart", onMainClick, false);
	}else{
		c.addEventListener("click", onMainClick, false);
	}
}
window.onresize = function(event) {//when canvas resize resize canvas
   resizeCanvas();
};
function resizeCanvas(){//resize canvas to aspect ratio
    windowWidth = document.body.offsetWidth;
    windowHeight = document.body.offsetHeight-25;
    
    //c.style.width = windowWidth + "px";//old code
    //c.style.height = windowHeight + "px";//use this code to not use aspect ratio
    
    //start aspect ratio
    var tmpHeight = windowHeight;
    var tmpWidth = windowHeight * 16 /9;
    scale = 720 / windowHeight;
    if(tmpWidth > windowWidth){//when width of canvas is bigger then window
        tmpWidth = windowWidth;
        tmpHeight = windowWidth * 9 / 16;
        scale = 1280 / windowWidth;
    }
    c.style.width = tmpWidth + "px";
    c.style.height = tmpHeight + "px";
}