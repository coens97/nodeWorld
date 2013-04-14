/*******************************
 * main.js
 * Especily for initilising canvas and create eventlisteners
 ******************************/
var c = document.getElementById("myCanvas"),//canvas element
    ctx = c.getContext("2d"),
    touch = false,
    stats;

//if touchscreen
if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
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
    'map',
    //game sprites
    'game/sprites/player',
    'game/sprites/map',
    'game/sprites/log',
    'game/sprites/score',
    'game/sprites/scoreboard',
    'game/sprites/cursor',
	'game/sprites/bullet',
    'guns'
    ],function(){
        requirejs([
            /* load scenes */
            'scenes/waitForConnection',
            'scenes/intro',
			'scenes/nickname',
			'scenes/menu',
			'scenes/hostGame',
			'scenes/waitRoom',
			'game/gameRoom'
			],function(){
                requirejs([
                    //requires of gameRoom
                    'game/processInput',
                    'game/serverUpdates',
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
    var tmpX,
        tmpY
    //for touch screen
    if(touch){
        tmpX = (e.touches[0].pageX - c.offsetLeft)*scale;
        tmpY = (e.touches[0].pageY - c.offsetTop)*scale;
    }else{
        tmpX = (e.pageX - c.offsetLeft)*scale;
        tmpY = (e.pageY - c.offsetTop)*scale;
    }
    mouse.x = tmpX;
    mouse.y = tmpY;
    game.mouseDown(tmpX,tmpY);
}
var mouse = {"x":1280,"y":360};
function onMouseMove(e){
    if(touch){
        mouse.x = (e.touches[0].pageX - c.offsetLeft)*scale;
        mouse.y = (e.touches[0].pageY - c.offsetTop)*scale;
    }else{
        mouse.x = (e.pageX - c.offsetLeft)*scale;
        mouse.y = (e.pageY - c.offsetTop)*scale;
    }
}
var keyDown = function(event){
    var keycode = event.charCode || event.keyCode;
    if (keycode == 9) {//disable tab button
            event.preventDefault();
    }
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
        c.addEventListener("touchmove", onMouseMove, false);
        document.getElementById("bleft").style.display = 'block';
        document.getElementById("bright").style.display = 'block';
        document.getElementById("bup").style.display = 'block';
	}else{
		c.addEventListener("click", onMainClick, false);
        document.body.addEventListener("mousemove", onMouseMove, false);
	}
    //disable rightclick contextmenu because keyboard events don't work anymore
    document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
    
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
    /*resize the roomlist and scoreboard to*/
   var list = document.getElementById("roomList");
   var scoreb = document.getElementById("scoreboard");
   scoreb.style.top = list.style.top = tmpHeight/5+"px";
    list.style.left = c.offsetLeft + tmpWidth/24 + "px";
   list.style.width = tmpWidth*0.68 +"px";
   scoreb.style.width =  tmpWidth*0.4 +"px";
   scoreb.style.left = windowWidth/2 - tmpWidth*0.2 + "px";
   scoreb.style.height = list.style.height = tmpHeight*0.72 +"px";
   
}
document.ontouchmove = function(e) {//when on device with touchscreen want to scroll
    e.preventDefault();
};
