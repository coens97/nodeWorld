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
	this.vx = 0;
	this.vy = 0;
	
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
	this.loop = function(){
		var a1X = Math.round((scene.pX-8)/world.tilesets[0].tilewidth-0.5);//xpos left from it
		var a2X = Math.round(scene.pX/world.tilesets[0].tilewidth);//xpos of it
		var a3X = Math.round(scene.pX/world.tilesets[0].tilewidth+0.5);//xpos right of it
		var a1Y = Math.round((scene.pY-8)/world.tilesets[0].tileheight-0.5);//ypos of top of it
		var a2Y = Math.round(scene.pY/world.tilesets[0].tileheight);//ypos of it
		var a3Y = Math.round(scene.pY/world.tilesets[0].tileheight+0.5);//ypos under it
		//vertical collision
		//if(a1X+2==a3X){//if horizontaly align to grid
			if(this.vY<0){//if moving up
				var cU = world.layers[0].data[(a1Y)*world.layers[0].width+a2X];
				if(checkCol(cU)){//if there is an object above and moving up
					this.vY = 0;
				}
			}else if(this.vY>0){//if moving left
				var cB = world.layers[0].data[(a3Y)*world.layers[0].width+a2X];
				if(checkCol(cB)){
					this.vY = 0;
				}
			}
		//}
		//horizontal collision
		//if(a1Y+2==a3Y){//if vericaly align to grid
			if(this.vX<0){//if moving to left
				var cL = world.layers[0].data[(a2Y)*world.layers[0].width+a1X];
				if(checkCol(cL)){
					this.vX = 0;
				}
			}else if(this.vX>0){//or when moving right
				var cR = world.layers[0].data[(a2Y)*world.layers[0].width+a3X];
				if(checkCol(cR)){
					this.vX = 0;
				}
			}
		//}
		//console.log(a1Y+" "+a2Y+" "+a3Y);
		console.log(scene.pX+" "+scene.pY)
		scene.pX += this.vX;
		scene.pY += this.vY;
	};
}
