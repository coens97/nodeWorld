/**********************
 * Especialy for calling the gamsScene functions
 ********************/
var game = {
    currentScene : 0,
    scenes : [
        new waitForConnection(),//0
        new intro(),//1
		new nickname(),//2
		new menu(),//3
    ],
    loop : function(){//gameLoop function(game.loop)
        this.scenes[this.currentScene].loop();
    },
    draw : function(){
        ctx.clearRect (0,0,1280,720);//clear the canvas
        this.scenes[this.currentScene].draw();
    },
    mouseDown : function(x,y){//resolution 1280 720
        console.log("Mouse down x:"+x+"y:"+y);
		this.scenes[this.currentScene].mouseDown(x,y);
    },
    keyDown : function(key){
    	console.log("Key pressed:"+key);
    	this.scenes[this.currentScene].keyDown(key);
    },
	startScene : function(n){
		this.scenes[n].startScene();
		this.currentScene = n;
	},
	newConnection : function(){
		console.log("let's go to intro because we have connection");
		this.startScene(1);
	}
}
