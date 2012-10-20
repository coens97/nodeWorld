function def(inp){//check if input is defined
	if(typeof(inp)!='undefined'){
		return true;
	}else{
		false;
	}
}
function player(x,y){
	this.x = x;
	this.y = y;
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
}
function currentPlayer(x,y,world,scene){
	this.p = new player(x,y);
	this.draw = function(){
		this.p.draw();
	};
	this.loop = function(){
		var a1X = Math.round((scene.pX-8)/world.tilesets[0].tilewidth-0.5);//xpos left from it
		var a2X = Math.round(scene.pX/world.tilesets[0].tilewidth);//xpos of it
		var a3X = Math.round(scene.pX/world.tilesets[0].tilewidth+0.5);//xpos right of it
		var a1Y = Math.round((scene.pY-8)/world.tilesets[0].tileheight-0.5);//ypos of top of it
		var a2Y = Math.round(scene.pY/world.tilesets[0].tileheight);//ypos of it
		var a3Y = Math.round(scene.pY/world.tilesets[0].tileheight+0.5);//ypos under it
		//vertical collision
		if(scene.vY<0){//if moving up
			var cU = world.layers[0].data[(a1Y)*world.layers[0].width+a2X];
			if(cU!=0&&def(cU)){//if there is an object above and moving up
				scene.vY = 0;
			}
		}else if(scene.vY>0){//if moving left
			var cB = world.layers[0].data[(a3Y)*world.layers[0].width+a2X];
			if(cB!=0&&def(cB)){
				scene.vY = 0;
			}
		}
		//horizontal collision
		if(a1Y+2==a3Y){//if vericaly align to grid
			if(scene.vX<0){//if moving to left
				var cL = world.layers[0].data[(a2Y)*world.layers[0].width+a1X];
				if(cL!=0&&def(cL)){
					scene.vX = 0;
				}
			}else if(scene.vX>0){//or when moving right
				var cR = world.layers[0].data[(a2Y)*world.layers[0].width+a3X];
				if(cR!=0&&def(cR)){
					scene.vX = 0;
				}
			}
		}
		console.log(a1Y+" "+a2Y+" "+a3Y);
		scene.pX += scene.vX;
		scene.pY += scene.vY;
	};
}