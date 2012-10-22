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
	this.checkCollision = function(){
	};
	this.loop = function(){
		//this.onGround = false;//you can only jump when you're on the ground
		//collision
		this.checkCollision();
		//move player
		this.x += this.vX;
		this.y += this.vY;
	};
}