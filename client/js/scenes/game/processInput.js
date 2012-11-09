//mouse input
gameRoom.mouseDown = function(x,y) {

};
//keyboard input
gameRoom.proccesInput = function() {
    var oldVgx = this.player.vgX;
    this.player.vgX = 0;
    //this.player.vY = 0;
    if(def(this.keys[32])){//when space is pressed
        if(this.player.onGround!=2){
            this.player.vY = -20;
            this.player.onGround++;
        }
    }
    if(def(this.keys[68])&&!def(this.keys[65])){//when d is pressed
        this.player.vgX = 1;
    }
    if(def(this.keys[65])&&!def(this.keys[68])){//when a is pressed
        this.player.vgX = -1;
    }
    //send changes of input
    if(oldVgx!=this.player.vgX||def(this.keys[32])){//if there are changes in movement
        //send changes
        socket.emit("changedInput",{"t":this.time+(new Date().getTime() - this.lastTime),
                                    "vgX":this.player.vgX,  
                                    "x":this.player.x,  
                                    "vY":this.player.vY});
    }
};

gameRoom.keyDown = function(key){
	if(!def(this.keys[key])){
		this.keys[key] = true;
		this.keyPress(key);
	}
};
gameRoom.keyPress = function(key){
    this.proccesInput();//check keyboard input
};
gameRoom.keyUp = function(key){
	delete this.keys[key];//remove from object
	console.log("Released key:"+key);
    this.proccesInput();//check keyboard input
};

if(touch){//for touchscreens
    gameRoom.onTouch = function(key){//when button is touched
        if(game.currentScene==6){
            switch(key){
                case 0: this.player.vgX = -1; break;//left
                case 1: this.player.vgX = 1; break;//right
                case 2: if(this.player.onGround!=2){this.player.vY = -20;this.player.onGround++;}
                break;//up
            }
            socket.emit("changedInput",{"t":this.time+(new Date().getTime() - this.lastTime),
                                    "vgX":this.player.vgX,
                                    "vY":this.player.vY});
        }
    };
    gameRoom.stopTouch = function(key){//when button is release
        if(game.currentScene==6){
            switch(key){
                case 0://left
                case 1: this.player.vgX = 0; 
                break;//right
            }
            socket.emit("changedInput",{"t":this.time+(new Date().getTime() - this.lastTime),
                                    "vgX":this.player.vgX,
                                    "vY":this.player.vY});
        }
    };
    document.getElementById("bleft").addEventListener('touchstart', function(event) {//when left is pressed
        game.scenes[6].onTouch(0);
    },false);
    document.getElementById("bright").addEventListener('touchstart', function(event) {//when right is pressed
        game.scenes[6].onTouch(1);
    },false);
    document.getElementById("bup").addEventListener('touchstart', function(event) {//when up is pressed
        game.scenes[6].onTouch(2);
    },false);
    document.getElementById("bleft").addEventListener('touchend', function(event) {//when left is pressed
        game.scenes[6].stopTouch(0);
    },false);
    document.getElementById("bright").addEventListener('touchend', function(event) {//when right is pressed
        game.scenes[6].stopTouch(1);
    },false);
}//end touch