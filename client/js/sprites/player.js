function player(x,y){
	this.x = x;
	this.y = y;
	this.color = "#59E01B";
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x+32, this.y+32, 32, 0, Math.PI*2, true); 
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
		if(scene.pX+scene.vX<0){scene.pX=0;scene.vX=0;}
		if(scene.pY+scene.vY<0){scene.pY=0;scene.vY=0;}
		scene.pX += scene.vX;
		scene.pY += scene.vY;
	};
}