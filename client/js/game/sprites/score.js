/******************
* Overlay overgameplay to show health m ammo and score 
*******************/
function score() {
	this.health = 100;
	this.draw = function(){
		ctx.fillStyle = "#DDDDDD";
   		ctx.fillRect(40, 40, 154, 14);
   		ctx.fillStyle = "#FF0000";
   		ctx.fillRect(42, 42, 1.5*this.health, 10);
	};
}