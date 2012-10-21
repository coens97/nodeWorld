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
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x+32, this.y+32, 31, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
	};
	this.getBound = function(){
		return{a1X : Math.round((scene.pX-8)/world.tilesets[0].tilewidth-0.5),//xpos left from it
				a2X : Math.round(scene.pX/world.tilesets[0].tilewidth),//xpos of it
				a3X : Math.round(scene.pX/world.tilesets[0].tilewidth+0.5),//xpos right of it
				aY : Math.round((scene.pY+this.vY)/world.tilesets[0].tileheight),//ypos of it
				a1Y :  Math.round((scene.pY+this.vY)/world.tilesets[0].tileheight-0.5),//ypos of above it
				a2Y : Math.round((scene.pY+this.vY)/world.tilesets[0].tileheight),//ypos of it
				a3Y : Math.round((scene.pY+this.vY)/world.tilesets[0].tileheight+0.5)}//ypos under it
	};
	this.isSolid = function(x,y){
		if(x>0&&y>0&&x<world.layers[0].width&&y<world.layers[0].width){//if in world
			return checkCol(world.layers[0].data[y*world.layers[0].width+x]);
		}else{
			return false;
		}
	};
	this.loop = function(){
		//collision
		var bD = this.getBound();
		//vertical collision
		if(scene.pX%world.tilewidth==0){//if horizontaly align to grid
			if(this.vY<0){//if moving up
				if(this.isSolid(bD.a2X,bD.a1Y)){//if there is an object above and moving up
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}else if(this.vY>0){//if moving down
				if(this.isSolid(bD.a2X,bD.a3Y)){
					scene.pY = bD.aY*world.tileheight;
					this.vY = 0;
				}
			}
		}else{
			if(this.vY<0){//if moving up
				if(this.isSolid(bD.a1X,bD.a1Y)||this.isSolid(bD.a3X,bD.a1Y)){//if there is an object above and moving up
					scene.pY = bD.aY*world.tileheight;
					this.vY = 0;
				}
			}else if(this.vY>0){//if moving down
				if(this.isSolid(bD.a1X,bD.a3Y)||this.isSolid(bD.a3X,bD.a3Y)){
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}
		}
		bD = this.getBound();
		//horizontal collision
		if(scene.pY%world.tileheight==0){//if vericaly align to grid
			if(this.vX<0){//if moving to left
				if(this.isSolid(bD.a1X,bD.a2Y)){
					this.vX = 0;
				}
			}else if(this.vX>0){//or when moving right
				if(this.isSolid(bD.a3X,bD.a2Y)){
					this.vX = 0;
				}
			}
		}else{
			if(this.vX<0){//if moving to left
				if(this.isSolid(bD.a1X,bD.a1Y)||this.isSolid(bD.a1X,bD.a3Y)){
					this.vX = 0;
				}
			}else if(this.vX>0){//or when moving right
				if(this.isSolid(bD.a3X,bD.a1Y)||this.isSolid(bD.a3X,bD.a3Y)){
					this.vX = 0;
				}
			}
		}
		scene.pX += this.vX;
		scene.pY += this.vY;
		this.vY +=1;
	};
}