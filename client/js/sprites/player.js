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
		var aX = Math.round(scene.pX/world.tilesets[0].tilewidth-0.5);
		var a1X = Math.round((scene.pX-8)/world.tilesets[0].tilewidth-0.5);
		var a1Y = Math.round((scene.pY-8)/world.tilesets[0].tileheight-0.5);
		var a3Y = Math.round(scene.pY/world.tilesets[0].tileheight+0.5);
		
		var cU = world.layers[0].data[(a1Y)*world.layers[0].width+aX];
		if(cU!=0&&def(cU)&&scene.vY<0){//if there is an object above and moving up
			scene.vY = 0;
		}
		var cB = world.layers[0].data[(a3Y)*world.layers[0].width+aX];
		if(cB!=0&&def(cB)&&scene.vY>0){//if there is an object under and moving down
			scene.vY = 0;
		}
		var cL = world.layers[0].data[(a1Y)*world.layers[0].width+a1X];
		if(cL!=0&&def(cL)&&scene.vX<0){//if there is an object above and moving up
			scene.vX = 0;
		}
		scene.pX += scene.vX;
		scene.pY += scene.vY;
	};
}