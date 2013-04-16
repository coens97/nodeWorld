//mouse input
gameRoom.smg = false;
gameRoom.mouseDown = function(x,y) {
    //Player shoots
    if(guns[this.player.gun].smg==true){//if player has smg
        this.smg = true;
    }else{
        this.shoot();
    }    
};

gameRoom.shoot = function(x,y){
    var sX = this.player.x  + (this.player.dir?-12:12) + Math.cos(this.player.rot) * 80,
        sY = this.player.y + 6 + Math.sin(this.player.rot) * 80;
    if(this.round>0){
        this.round--;
        if(this.round<=0){
            //reload
            this.reload();
        }
        this.shot = {
            "x": sX,
            "y": sY,
            "rot": this.player.rot
        };  
    }
}

gameRoom.mouseUp = function(x,y){
    this.smg = false;
};

gameRoom.reload = function(){
    window.setTimeout(function(){//setTimeout for reload time
        if(gameRoom.ammo!=0){
            var needed = guns[gameRoom.player.gun].round - gameRoom.round;
            if(needed<=gameRoom.ammo){
                gameRoom.round = guns[gameRoom.player.gun].round;
                gameRoom.ammo -= needed;
            }else{
                gameRoom.round += gameRoom.ammo;
                gameRoom.ammo = 0;
            }
        }
    },guns[gameRoom.player.gun].rt);
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
    if(key==9){//if TAB is pressed 
        document.getElementById("scoreboard").style.display = "block";
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
    if(key==9){//if TAB is pressed 
        document.getElementById("scoreboard").style.display = "none";
    }else if(key==82){
        gameRoom.reload();
    }
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