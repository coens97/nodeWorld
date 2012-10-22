/*******************************
 * main.js
 * Especily for initilising canvas and create eventlisteners
 ******************************/
var c = document.getElementById("myCanvas"),//canvas element
    ctx = c.getContext("2d");
//include other files
requirejs(['socket',
    /* put sprites here */
    'sprites/basic',
    'sprites/button',
    'sprites/player',
    'map',
    'sprites/map'
    ],function(){
        requirejs([/* load scenes */
            'scenes/waitForConnection',
            'scenes/intro',
			'scenes/nickname',
			'scenes/menu',
			'scenes/hostGame',
			'scenes/waitRoom',
			'scenes/gameRoom'
			],function(){
                requirejs(['game'],function(){
                    init();
                });//end loading sprites + scenes + game
        });//end loading sprites + scenes
});//end loading sprites
var windowWidth,//width of canvas
    windowHeight,//height of canvas
    scale,//how much is the canvas zoomed in or out
    gameInterval;//will contain timer fot loop

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
function mainLoop(){
	setTimeout(function() {
        requestAnimationFrame(mainLoop);
        game.loop();//call game mainloop
    	game.draw();//draw game
    }, 1000 / 60);
}

function onMainClick(e){
    var tmpX = (e.pageX - c.offsetLeft)*scale;
    var tmpY = (e.pageY - c.offsetTop)*scale;
    game.mouseDown(tmpX,tmpY);
}

var keyDown = function(event){
    var keycode = event.charCode || event.keyCode;
    game.keyDown(keycode);
}
var keyUp = function(event){
	var keycode = event.charCode || event.keyCode;
	game.keyUp(keycode);
};
function init(){
    resizeCanvas();
    
    //add eventlisteners for click or touch
    if ('ontouchstart' in document.documentElement) {//check if it has touchscreen
        c.addEventListener("touchstart", onMainClick, false);
	}else{
		c.addEventListener("click", onMainClick, false);
	}
    mainLoop();
    document.body.addEventListener("keydown",keyDown);
    document.body.addEventListener("keyup",keyUp);
    console.log("Canvas initialised");
}
window.onresize = function(event) {//when canvas resize resize canvas
   resizeCanvas();
};
function resizeCanvas(){//resize canvas to aspect ratio
    windowWidth = document.body.offsetWidth;
    windowHeight = document.body.offsetHeight;
    
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
    /*resize the roomlist to*/
   var list = document.getElementById("roomList");
   list.style.top = tmpHeight/5+"px";
   list.style.left = c.offsetLeft + tmpWidth/24 + "px";
   list.style.width = tmpWidth*0.68 +"px";
   list.style.height = tmpHeight*0.72 +"px";
   
}
document.ontouchmove = function(e) {//when on device with touchscreen want to scroll
    e.preventDefault();
};