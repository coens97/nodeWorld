//mouse input
gameRoom.mouseDown = function(x,y) {

};

gameRoom.keyDown = function(key){
	if(!def(this.keys[key])){
        this.keys[key] = true;
        this.keyPress(key);
    }
    if(key==32){//if spacebar is pressed
        if(this.player.onGround!=2){
            this.player.vY = -20;
            this.player.onGround++;
        }
    } 
};
gameRoom.keyPress = function(key){
    if(!def(this.keys[key])){
        this.keys[key] = true;
        this.keyPress(key);
    }
};
gameRoom.keyUp = function(key){
	delete this.keys[key];//remove from object
};

if(touch){//for touchscreens
    gameRoom.onTouch = function(key){//when button is touched
        if(game.currentScene==6){
            switch(key){
                case 0: this.keys[65] = true; break;//left
                case 1: this.keys[68] = true; break;//right
                case 2: if(this.player.onGround!=2){this.player.vY = -20;this.player.onGround++;}
                break;//up
            }
        }
    };
    gameRoom.stopTouch = function(key){//when button is release
        if(game.currentScene==6){
            switch(key){
                case 0: delete this.keys[65]; break;//left
                case 1: delete this.keys[68]; break;//right
            }
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