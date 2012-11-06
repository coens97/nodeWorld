//mouse input
gameRoom.prototype.mouseDown = function(x,y) {

};
//keyboard input
gameRoom.prototype.proccesInput = function() {
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
        socket.emit("changedInput",{"vgX":this.player.vgX,
                                    "vY":this.player.vY});
    }
};

gameRoom.prototype.keyDown = function(key){
	if(!def(this.keys[key])){
		this.keys[key] = true;
		this.keyPress(key);
	}
};
gameRoom.prototype.keyPress = function(key){
    this.proccesInput();//check keyboard input
};
gameRoom.prototype.keyUp = function(key){
	delete this.keys[key];//remove from object
	console.log("Released key:"+key);
    this.proccesInput();//check keyboard input
};

