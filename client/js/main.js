/*******************************
 * main.js
 * Especily for initilising canvas and create eventlisteners
 ******************************/

//include other files
requirejs(['socket',
    /* put sprites here */
    'sprites/basic'
    ],function(){
        requirejs([/* load scenes */
            'scenes/waitForConnection',
            'scenes/intro'],function(){
                requirejs(['game'],function(){
                    init();
                });//end loading sprites + scenes + game
        });//end loading sprites + scenes
});//end loading sprites
var c,//canvas element
    ctx,//canvas 2d content to draw in
    windowWidth,//width of canvas
    windowHeight,//height of canvas
    scale,//how much is the canvas zoomed in or out
    gameInterval;//will contain timer fot loop

function mainLoop(){
    game.loop();//call game mainloop
    game.draw();//draw game
}

function onMainClick(e){
    var tmpX = (e.pageX - c.offsetLeft)*scale;
    var tmpY = (e.pageY - c.offsetTop)*scale;
    game.mouseDown(tmpX,tmpY);
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
    gameInterval = self.setInterval(function(){mainLoop();},16);//call mainGameLoop() evry 16 ms
    console.log("Canvas initialised");
}
window.onresize = function(event) {//when canvas resize resize canvas
   resizeCanvas();
};
function resizeCanvas(){//resize canvas to aspect ratio
    windowWidth = document.body.offsetWidth;
    windowHeight = document.body.offsetHeight-25;
    
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
document.ontouchmove = function(e) {//when on device with touchscreen want to scroll
    e.preventDefault();
};