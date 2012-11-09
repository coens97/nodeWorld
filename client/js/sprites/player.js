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

/*load tux image*/
var tuxImg = new Image();

tuxImg.onload = function() {
	console.log("Tux loaded");
};
tuxImg.src = 'images/tux.png';

function player(nickname,color,x,y,world,scene){
	this.x = x;
	this.y = y;
	this.vgX = 0;//which move x is pressed
	this.vX = 0;
	this.vY = 0;
	this.onGround = 0;
	this.nickname = nickname;
	this.frame = 1;
	this.sy = 0;//the row to draw of tux.png

	this.color = color;
	this.draw = function(){
		var x =  this.x + scene.map.x;
		var y = this.y + scene.map.y;
		
		//draw players name
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center"; 
		ctx.font = "bold 16px sans-serif";
    	ctx.fillText(this.nickname, x, y-56);
		//draw tux
		if(frameCounter.frame%3==0){//go to the next frame of image
			this.frame++;
			if(this.frame>5){
				this.frame = 0;
			}
		}
		//horizontal moving
		if(this.vgX<0){//if moving left
			this.sy = 0;//first row of tux.png
		}else if(this.vgX>0){
			this.sy = 1;//second row of tux.png
		}else{
			this.frame = 1;//when not moving keep animation still
		}
		//vertical moving
		if(this.onGround!=0){//if jumping
			ctx.drawImage(tuxImg, this.sy*48, 128, 48, 64, x-24, y-32, 48, 64);
		}else{//when not jumping
			ctx.drawImage(tuxImg, this.frame*48, this.sy * 64, 48, 64, x-24, y-32, 48, 64);
		}
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
		if((this.y+this.vY)%world.tileheight==0){//if horizontaly on grid
			oy = [fy-1,fy];
		}else{
			oy = [fy-1,fy,fy+1];
		}
		//console.log("x"+x+" y"+y);//for debuging
		return {x:ox,y:oy};
	};
	this.checkCollision = function(){
		var b = this.getCor("y");
		//check for moving down
		if(this.vY>0&&this.areSolidY(b.x,b.y[2])){//if moving down and something solid under it
			this.vY = 0;
			for(var ty = b.y[1];this.areSolidY(b.x,ty);ty--);//this will probably 0 iteration, its just to check
			this.y = world.tileheight*ty;
			this.onGround = 0;
		}else if(this.onGround==0){//if there is nothing under it and not in jump state
			this.onGround = 1;
		}
		//check for moving up
		if(this.vY<0&&this.areSolidY(b.x,b.y[0])){
			this.vY = 0;
			this.y = world.tileheight*b.y[2];
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
		//collision
		this.checkCollision();
		//move player
		this.x += Math.round(this.vX*dif.d);//movespeed * deltatime/(1000/60)//so it wil move smoothly on all machines
		this.y += Math.round(this.vY*dif.d);//Math.round - canvas hates floating points
        if(world.tileheight*world.height+720<this.y){
            this.y = 0;
            this.vy = 0;
            this.x = 640;
        }
        this.vY +=1;//gravity
		this.vX = this.vgX*scene.speed ;//if the a or w is pressed in
	};
}