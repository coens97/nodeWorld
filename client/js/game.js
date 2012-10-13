/**********************
 * Especialy for calling the gamsScene functions
 ********************/
var game = {
    currentScene : 0,
    scenes : [
        new intro()//0
    ],
    loop : function(){//gameLoop function(game.loop)

    },
    draw : function(){

    },
    mouseDown : function(x,y){//resolution 1280 720
        console.log("Mouse down x:"+x+"y:"+y);
    }
}
