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
	this.eX = 1;
	this.des = {//destination
		"stop":false,//when player stop moving
		"pos" : {
			"x" : x,
			"y" : y
		}
	};
	this.vY = 0;
	this.onGround = 0;
	this.nickname = nickname;
	this.frame = 1;
	this.dir = true;//the row to draw of tux.png
	this.gun = 0;

	this.draw = function(){
		var x =  this.x + scene.map.x;
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
		//vertical moving
		if(this.onGround!=0){//if jumping
			ctx.drawImage(pivotImg, 4*64, 0, 64, 128, 0, 0, 64, 128);
		}else{//when not jumping
			ctx.drawImage(pivotImg, this.frame*64, 0, 64, 128, 0, 0, 64, 128);
		}
		ctx.drawImage(trollImg, 0, this.type, 64, 64, 0, 0, 64, 64);//draw face
		//ctx.drawImage(gunsImg, 0, this.gun*64, 72, 48, 40, 40, 72, 48);//draw gun
		ctx.restore();//restore canvas setting
		
	};
	//collision stuff
	this.isSolid = function(x,y){
		if(x>0&&y>0&&x<world.width&&y<world.height){//if player is in room
			return checkCol(world.layers[0].data[y*world.layers[0].width+x]);
		}else{
			return false;
		}
	};
	this.areSolidY = function(x,y){
		var solid = false;
		for(var i = 0;i<x.length;i++){
			if(this.isSolid(x[i],y)){
				solid = true;
			}
		}
		return solid;
	};
	this.areSolidX = function(x,y){
		var solid = false;
		for(var i = 0;i<y.length;i++){
			if(this.isSolid(x,y[i])){
				solid = true;
			}
		}
		return solid;
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
	};
	this.loop = function(){
		this.vY +=1;//gravity
		this.vX = this.eX ;//if the a or w is pressed in

		//when is set to stop at a x pos
		if(this.stop&&((this.x<this.des.x&&this.x+this.vX>this.des.x)||(this.x>this.des.x&&this.x+this.vX<this.des.x))){
			this.vX = 0;//stop horizontaly moving
			this.x = this.des.x;//put it to destination x
			this.vgX = 0;
			this.des.stop = true;
			alert("stopped player");
		}
		//collision
		this.checkCollision();
		//move player
		this.x += Math.round(this.vX*dif.d);//movespeed * deltatime/(1000/60)//so it wil move smoothly on all machines
		this.y += Math.round(this.vY*dif.d);//Math.round - canvas hates floating points
        if(world.tileheight*world.height+720<this.y){
            this.y = 0;
            this.vy = 0;
            this.x = 700;
        }
	};
}