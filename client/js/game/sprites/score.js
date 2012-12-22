/******************
* Overlay overgameplay to show health m ammo and score 
*******************/
function score() {
	this.health = 100;
	this.draw = function(){
		//////show health
		//draw outer circle
		ctx.beginPath();
		ctx.strokeStyle = "#DDDDDD";
		ctx.lineWidth = 10;
   		ctx.arc(120,620,70,0,2*Math.PI);
   		ctx.stroke();
   		ctx.closePath();
   		//draw health
   		ctx.beginPath();
   		ctx.strokeStyle = "#FF0000";
   		ctx.lineWidth = 8;
   		ctx.arc(120,620,70,1.5*Math.PI,1.5*Math.PI+this.health/101*2*Math.PI);//its health/101 because therre is a little gap between it
   		ctx.stroke();
   		ctx.closePath();
	};
}