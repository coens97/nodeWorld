/**********************
 * Especialy for calling the gamsScene functions
 ********************/
var game = {
    currentScene : 0,
    scenes : [
        new intro()//0
    ],
    loop : function(){//gameLoop function(game.loop)
        this.scenes[this.currentScene].loop();
    },
    draw : function(){
        ctx.clearRect (0,0,800,600);//clear the canvas
        this.scenes[this.currentScene].draw();
    },
    mouseDown : function(x,y){//resolution 1280 720
        console.log("Mouse down x:"+x+"y:"+y);
    }
}
