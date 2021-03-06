function def(inp){//check if input is defined
	if(typeof(inp)!='undefined'){
		return true;
	}else{
		false;
	}
}

function checkCol(inp){//check if solid
	if(inp!=0&&def(inp)){
		return true;
	}else{
		return false;
	}
}

/*load troll image*/
var trollImg = new Image();
trollImg.onload = function() {
	console.log("Troll loaded");
};
trollImg.src = 'images/troll.png';
var gunsImg = new Image();
gunsImg.onload = function() {
	console.log("Guns loaded");
};
gunsImg.src = 'images/guns.png';
var pivotImg = new Image();
pivotImg.onload = function() {
	console.log("Guns loaded");
};
pivotImg.src = 'images/pivot.png';

function player(nickname,x,y,world,scene){
	this.type = 0;
	this.x = x;
	this.y = y;
	this.vgX = 0;//which move x is pressed
	this.vX = 0;
	this.eX = 0;
	this.des = {//destination
		"stop":false,//when player stop movin
		"x" : x,
	};
	this.vY = 0;
	this.onGround = 0;
	this.nickname = nickname;
	this.frame = 1;
	this.dir = true;
	this.rot = 0;//rotation of gun

	this.kills = 0;
	this.deaths = 0;
	this.gun = 0;
	
	this.draw = function(){
		var x = this.x + scene.map.x;
		var y = this.y + scene.map.y;
		
		if(x>1312||x<-32||y<-64||y>784){//if player out of view don't draw it
			return;
		}

		//draw players name
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center"; 
		ctx.font = "bold 16px sans-serif";
    	ctx.fillText(this.nickname, x, y-96);
		//draw tux
		if(frameCounter.frame%3==0){//go to the next frame of image
			this.frame++;
			if(this.frame>4){
				this.frame = 0;
			}
		}
		ctx.save();//save draw state because of transform
		//horizontal moving
		if(this.vgX<0){//if moving left
			this.dir = true;
		}else if(this.vgX>0){
			this.dir = false;
		}else{
			this.frame = 5;//when not moving keep animation still
		}

		if(this.dir){
			ctx.translate(x+32, y-64);
			ctx.scale(-1, 1);//flip image
		}else{
			ctx.translate(x-32, y-64);
		}
		//draw pivot
		if(this.onGround!=0){//if jumping
			ctx.drawImage(pivotImg, 4*64, 0, 64, 128, 0, 0, 64, 128);
		}else{//when not jumping
			ctx.drawImage(pivotImg, this.frame*64, 0, 64, 128, 0, 0, 64, 128);
		}
		ctx.drawImage(trollImg, 0, this.type, 64, 64, 0, 0, 64, 64);//draw face
		//draw arm
		ctx.strokeStyle = '#000000';
		ctx.translate(44,70);
		this.dir?ctx.rotate(Math.PI-this.rot+0.1):ctx.rotate(this.rot+0.1);
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(24,0);
		ctx.stroke();
		//draw gun
		ctx.drawImage(gunsImg, 0, this.gun*48, 72, 48, 8, -25, 72, 48);
		ctx.restore();//restore canvas setting
		
	};
	//collision stuff
	this.isSolid = function(l,x,y){
		if(x>0&&y>0&&x<world.width&&y<world.height){//if player is in room
			return checkCol(world.layers[l].data[y*world.layers[0].width+x]);
		}else{
			return false;
		}
	};
	this.areSolidY = function(x,y){
		for(var i = 0;i<x.length;i++){
			if(this.isSolid(0,x[i],y)){
				return true;
			}
		}
		return false;
	};
	this.areSolidX = function(x,y){
		for(var i = 0;i<y.length;i++){
			if(this.isSolid(0,x,y[i])){
				return true;
			}
		}
		return false;
	};
	this.getCor = function(dim){//returns coordinates(world) of player 
		var fx = dim=="x"?Math.round((this.x-16+this.vX)/ world.tilewidth):Math.round((this.x-16)/ world.tilewidth);
		var fy = dim=="y"?Math.round((this.y-16+this.vY)/ world.tileheight):Math.round((this.y-16)/ world.tileheight);
		var ox,oy;
		if((dim=="y"&&this.x%world.tilewidth==0)||(dim=="x"&&this.x+this.vX%world.tilewidth==0)){//if horizontaly on grid
			ox = [fx-1,fx];
		}else{
			ox = [fx-1,fx,fx+1];
		}
		if((this.y+this.vY)%world.tileheight==0){//if verticly on grid
			oy = [fy-2,fy-1,fy,fy+1];
		}else{
			oy = [fy-2,fy-1,fy,fy+1,fy+2];
		}
		//console.log("x"+x+" y"+y);//for debuging
		return {x:ox,y:oy};
	};

	this.checkGun = function(x,y){
		for(var aY = 0;aY<y.length;aY++){
			for(var aX = 0;aX<x.length;aX++){
				if(this.isSolid(1,x[aX],y[aY])){
					var pos = y[aY]*world.layers[0].width+x[aX];
					if(typeof gameRoom.inactiveGuns[pos] == 'undefined'){
						gameRoom.inactiveGuns[pos] = true;
						setTimeout(function(){
							delete gameRoom.inactiveGuns[pos];
						},20000);
						return world.layers[1].data[pos]-world.tilesets[1].firstgid;
					}
				}
			}
		}
		return 0;
	};
	this.checkCollision = function(){
		var b = this.getCor("y");
		//check for moving down
		if(this.vY>0&&this.areSolidY(b.x,b.y[4])){//if moving down and something solid under it
			this.vY = 0;
			for(var ty = b.y[3];this.areSolidY(b.x,ty);ty--);//this will probably 0 iteration, its just to check
			this.y = world.tileheight*(ty-1);
			this.onGround = 0;
		}else if(this.onGround==0){//if there is nothing under it and not in jump state
			this.onGround = 1;
		}
		//check for moving up
		if(this.vY<0&&this.areSolidY(b.x,b.y[0])){
			this.vY = 0;
			this.y = world.tileheight*b.y[3];
		}
		
		b = this.getCor("x");
		//check for moving right
		if(this.vX>0&&this.areSolidX(b.x[2],b.y)){//if moving down and something solid under it
			this.vX = 0;
			this.x = world.tilewidth*b.x[1];
		}
		//check for moving left
		if(this.vX<0&&this.areSolidX(b.x[0],b.y)){//if moving down and something solid under it
			this.vX = 0;
			this.x = world.tilewidth*(b.x[1]+1);
		}
		//check gun
		var gotGun = this.checkGun(b.x,b.y);
		if(gotGun!=0){
			//change gun
			if(this==gameRoom.player){
				this.getGun(gotGun);
			}
		}
	};
	this.getGun = function(theGun){
			this.gun = theGun;
			if(guns[this.gun].smg==false){//if player has smg
				gameRoom.smg = false;
			}
			gameRoom.round = guns[this.gun].round;
		    gameRoom.ammo = guns[this.gun].ammo;
	};
	this.loop = function(){
		//regegain health
		if(gameRoom.health!=100){//if health is not full
			gameRoom.health+=0.1;
			(gameRoom.health>100)&&(gameRoom.health=100);//when health is more then 100
		} 

		this.vY += Math.round(dif.d);//gravity
		this.vX = Math.round(this.eX*dif.d);//if the a or w is pressed in

		//when is set to stop at a x pos
		if(this.des.stop&&((this.x<=this.des.x&&this.x+this.vX>=this.des.x)||(this.x>=this.des.x&&this.x+this.vX<=this.des.x))){
			this.vX = 0;//stop horizontaly moving
			this.eX = 0;
			this.x = this.des.x;//put it to destination x
			this.vgX = 0;
			this.des.stop = false;
		}
		//collision
		this.checkCollision();
		//move player
		this.x += this.vX;//movespeed * deltatime/(1000/60)//so it wil move smoothly on all machines
		this.y += this.vY;//Math.round - canvas hates floating points
	};
}
