/******************
* Overlay overgameplay to show health m ammo and score 
*******************/
function score() {
	this.draw = function(){
		//////show health
		//draw outer circle
		ctx.beginPath();
		ctx.strokeStyle = "#DDDDDD";
		ctx.lineWidth = 10;
		ctx.arc(1160,620,76,0,2*Math.PI);
		ctx.stroke();
		ctx.closePath();
		//draw health
		ctx.beginPath();
		ctx.strokeStyle = "#FF3B3B";
		ctx.lineWidth = 8;
		ctx.arc(1160,620,76,1.5*Math.PI,1.5*Math.PI+gameRoom.health/101*2*Math.PI);//its health/101 because therre is a little gap between it
		ctx.stroke();
		ctx.closePath();

      //draw ammo
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'right';
      ctx.font="48px Arial";
      ctx.fillText(gameRoom.round,1148,582);

      ctx.textAlign = 'center';
      ctx.font="80px Arial";
      ctx.fillText("/",1156,580);

      ctx.textAlign = 'left';
      ctx.font="42px Arial";
      ctx.fillText(gameRoom.ammo,1170,608);
	};
}