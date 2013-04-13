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
		//check if bullet need to disapear
		for (var i = this.shots.length - 1; i >= 0; i--) {//loop trough all bullets
			var cS = this.shots[i];//current shot
			//remove bullets out of window
			if(cS.x>worldWidth||cS.x<-360||cS.y<-360||cS.y>worldHeight){
				this.shots.splice(i,1);
			}
			//Check collision with ground
			if(gameRoom.player.isSolid(0,Math.round(cS.x/gameWorld.tilewidth),Math.round(cS.y/gameWorld.tileheight))){
				this.shots.splice(i,1);
			}
			//check if bullet hit player
			for(var name in gameRoom.players.ar){
				var cP = gameRoom.players.ar[name];//current player
				if(cS.x>cP.x-32&&cS.x<cP.x+32&&cS.y>cP.y-62&&cS.y<cP.y+64){
					this.shots.splice(i,1);
				}
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
			cg.x += Math.cos(cg.rot)*32*dif.d;
			cg.y += Math.sin(cg.rot)*32*dif.d;
		}
	};
}
