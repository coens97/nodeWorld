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

function player(x,y,world,scene){
	this.x = x;
	this.y = y;
	this.vX = 0;
	this.vY = 0;

	this.color = "#59E01B";
	this.draw = function(){
		var x =  this.x + scene.map.x;
		var y = this.y + scene.map.y;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(x, y, 31, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
	};
	//collision stuff
	this.isSolid = function(x,y){
		return checkCol(world.layers[0].data[y*world.layers[0].width+x]);
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
		if(this.x%world.tilewidth==0){//if horizontaly on grid
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
			var ty = b.y[1];
			//for(var ty = b.y[1];this.areSolidY(b.x,ty);ty--);//this will probably 0 iteration, its just to check
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
		//this.onGround = false;//you can only jump when you're on the ground
		//collision
		this.checkCollision();
		//move player
		this.x += this.vX;
		this.y += this.vY;
	};
}