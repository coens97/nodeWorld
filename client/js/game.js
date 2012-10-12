/**********************
 * Especialy for calling the gamsScene functions
 ********************/
//requirejs(['scenes/intro']);
var game = {
    currentScene : 0,
    gameScenes : [
        //new intro()//0
    ],
    loop : function(){//gameLoop function(game.loop)

    },
    draw : function(){

    },
    mouseDown : function(x,y){//resolution 1280 720
        console.log("Mouse down x:"+x+"y:"+y);
    }
}
