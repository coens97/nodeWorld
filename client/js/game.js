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
		new hostGame(),//4
		new waitRoom(),//5
		gameRoom//6
    ],
    loop : function(){//gameLoop function(game.loop)
        dif.loop();//calculate elasped time for smoother animation
        this.scenes[this.currentScene].loop();
        frameCounter.count();
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
    	this.scenes[this.currentScene].keyDown(key);
    },
    keyUp : function(key){
    	if(this.currentScene == 6){//if game is running
    		this.scenes[6].keyUp(key);
    	}
    },
	startScene : function(n){
		this.scenes[this.currentScene].stopScene();
		this.scenes[n].startScene();
		this.currentScene = n;
	},
	newConnection : function(){
		console.log("let's go to intro because we have connection");
		this.startScene(1);
	}
}
//frameCounter - handy for animatiob of sprites
var frameCounter = {
    frame : 0,
    count : function(){
        this.frame++;
        if(this.frame >=60){
            this.frame = 0;            
        }
    }    
}
//calculates delta time, for smoother animations
var dif = {
    lastTime: new Date().getTime(),
    t : 0,
    d : 1,
    loop : function(){
        this.t = new Date().getTime() - this.lastTime;
	(this.t>30)&&(this.t=30);
        this.d = this.t/(1000/60)
        this.lastTime = new Date().getTime();
    }
};
