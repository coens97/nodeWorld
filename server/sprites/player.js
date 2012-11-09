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

this.player = function(color,x,y,world,scene){
	this.x = x;
	this.y = y;
	this.vgX = 0;//which move x is pressed
	this.vX = 0;
	this.vY = 0;

	this.color = color;
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
		this.vY +=1;//gravity
		this.vX = this.vgX*scene.speed ;//if the a or w is pressed in
		//collision
		this.checkCollision();
		//move player
		this.x += this.vX;
		this.y += this.vY;
        if(world.tileheight*world.height+720<this.y){
            this.y = 0;
            this.vy = 0;
            this.x = 640;
        }
	};
}