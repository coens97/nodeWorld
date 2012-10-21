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
				a1Y :  Math.round((scene.pY)/world.tilesets[0].tileheight-0.5),//ypos of above it
				a2Y : Math.round((scene.pY)/world.tilesets[0].tileheight),//ypos of it
				a3Y : Math.round((scene.pY)/world.tilesets[0].tileheight+0.5)}//ypos under it
	};
	this.loop = function(){
		this.vY +=1;
		//collision
		var bD = this.getBound();
		//vertical collision
		if(bD.a1X+2==bD.a3X){//if horizontaly align to grid
			if(this.vY<0){//if moving up
				var cU = world.layers[0].data[(bD.a1Y)*world.layers[0].width+bD.a2X];
				if(checkCol(cU)){//if there is an object above and moving up
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}else if(this.vY>0){//if moving down
				var cB = world.layers[0].data[(bD.a3Y)*world.layers[0].width+bD.a2X];
				if(checkCol(cB)){
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}
		}else{
			if(this.vY<0){//if moving up
				var c1U = world.layers[0].data[(bD.a1Y)*world.layers[0].width+bD.a1X];
				var c2U = world.layers[0].data[(bD.a1Y)*world.layers[0].width+bD.a3X];
				if(checkCol(c1U)||checkCol(c2U)){//if there is an object above and moving up
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}else if(this.vY>0){//if moving down
				var c1B = world.layers[0].data[(bD.a3Y)*world.layers[0].width+bD.a1X];
				var c2B = world.layers[0].data[(bD.a3Y)*world.layers[0].width+bD.a3X];
				if(checkCol(c1B)||checkCol(c2B)){
					scene.pY = bD.a2Y*world.tileheight;
					this.vY = 0;
				}
			}
		}
		bD = this.getBound();
		//horizontal collision
		if(bD.a1Y+2==bD.a3Y){//if vericaly align to grid
			if(this.vX<0){//if moving to left
				var cL = world.layers[0].data[(bD.a2Y)*world.layers[0].width+bD.a1X];
				if(checkCol(cL)){
					this.vX = 0;
				}
			}else if(this.vX>0){//or when moving right
				var cR = world.layers[0].data[(bD.a2Y)*world.layers[0].width+bD.a3X];
				if(checkCol(cR)){
					this.vX = 0;
				}
			}
		}else{
			if(this.vX<0){//if moving to left
				var c1L = world.layers[0].data[(bD.a1Y)*world.layers[0].width+bD.a1X];
				var c2L = world.layers[0].data[(bD.a3Y)*world.layers[0].width+bD.a1X];
				if(checkCol(c1L)||checkCol(c2L)){
					this.vX = 0;
				}
			}else if(this.vX>0){//or when moving right
				var c1R = world.layers[0].data[(bD.a1Y)*world.layers[0].width+bD.a3X];
				var c2R = world.layers[0].data[(bD.a3Y)*world.layers[0].width+bD.a3X];
				if(checkCol(c1R)||checkCol(c2R)){
					this.vX = 0;
				}
			}
		}
		scene.pX += this.vX;
		scene.pY += this.vY;
	};
}