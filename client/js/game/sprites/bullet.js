var bulletImg = new Image();
bulletImg.onload = function() {
	console.log("Bullet loaded");
};
bulletImg.src = 'images/bullet.png';

function bullets(){
	this.shots = [];
	this.add = function(arShots){//ad shots
		for (var i = arShots.length - 1; i >= 0; i--) {
			if(arShots[i]!=null){
				this.shots.push(arShots[i]);
			}
		}
	};

	var worldWidth = gameWorld.width*gameWorld.tilewidth + 360,
		worldHeight = gameWorld.height*gameWorld.tileheight + 360;
	this.loop = function(){
		for (var i = this.shots.length - 1; i >= 0; i--) {
			if(this.shots[i].x>worldWidth||this.shots[i].x<-360||this.shots[i].y<-360||this.shots[i].y>worldHeight){//remove bullet out of window
				this.shots.splice(i,1);
			}
		}
	};

	this.draw = function(){
		//Draw bullets
		for (var i = this.shots.length - 1; i >= 0; i--) {//loop trough all bullets
			var cg = this.shots[i];//current gun
			//rotate
			ctx.save();
			ctx.translate(cg.x + gameRoom.map.x, cg.y + gameRoom.map.y);
			ctx.rotate(cg.rot);

			ctx.drawImage(bulletImg, 0, -4);//draw bullet
			ctx.restore();

			//move bullets
			cg.x += Math.cos(cg.rot)*35;
			cg.y += Math.sin(cg.rot)*35;
		}
	};
}
