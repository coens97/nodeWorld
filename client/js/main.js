/*******************************
 * main.js
 * Especily for initilising canvas and create eventlisteners
 ******************************/
var c = document.getElementById("myCanvas"),//canvas element
    ctx = c.getContext("2d"),
    touch = false,
    stats;

//if touchscreen
if ('ontouchstart' in document.documentElement) {
    touch = true;
}
//requeestanimationframe
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
//include other files
requirejs([
    /*libaries*/
    '../lib/stats.min',
    '../lib/dat.gui.min.js',

    'socket',
    /* put sprites here */
    'sprites/basic',
    'sprites/button',
    'sprites/player',
    'map',
    'sprites/map',
    'sprites/log'
    ],function(){
        requirejs([
            /* load scenes */
            'scenes/waitForConnection',
            'scenes/intro',
			'scenes/nickname',
			'scenes/menu',
			'scenes/hostGame',
			'scenes/waitRoom',
			'scenes/game/gameRoom'
			],function(){
                requirejs([
                    //requires of gameRoom
                    'scenes/game/processInput',
                    'scenes/game/serverUpdates',
                    ],function(){
                    requirejs(['game'],function(){
                        requirejs(['debug'],function(){
                            init();
                        });
                    });
                });//end loading sprites + scenes + game
        });//end loading sprites + scenes
});//end loading sprites
var windowWidth,//width of canvas
    windowHeight,//height of canvas
    scale,//how much is the canvas zoomed in or out
    gameInterval;//will contain timer fot loop

function mainLoop(){
    requestAnimFrame(mainLoop);
    (debug.stats)&&stats.begin();//for showing fps
    game.loop();//call game mainloop
    game.draw();
    (debug.stats)&&stats.end();//end for showing fps
}

function onMainClick(e){
    var tmpX = (e.pageX - c.offsetLeft)*scale;
    var tmpY = (e.pageY - c.offsetTop)*scale;
    game.mouseDown(tmpX,tmpY);
}
var mouse = {"x":1280,"y":360};
function onMouseMove(e){
    mouse.x = (e.pageX - c.offsetLeft)*scale;
    mouse.y = (e.pageY - c.offsetTop)*scale;

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
    if (touch) {//check if it has touchscreen
        c.addEventListener("touchstart", onMainClick, false);
        document.getElementById("bleft").style.display = 'block';
        document.getElementById("bright").style.display = 'block';
        document.getElementById("bup").style.display = 'block';
	}else{
		c.addEventListener("click", onMainClick, false);
        document.body.addEventListener("mousemove", onMouseMove, false);
	}
    //gameInterval = self.setInterval(function(){mainLoop();},1000/60);//call mainGameLoop() every 16 ms
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
    var tmpWidth = Math.round(windowHeight * 16 /9+0.5);
    scale = 720 / windowHeight;
    if(tmpWidth > windowWidth){//when width of canvas is bigger then window
        tmpWidth = windowWidth;
        tmpHeight = Math.round(windowWidth * 9 / 16+0.5);
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