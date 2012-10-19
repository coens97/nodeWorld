
function map(world){
	var m = this;
	this.x = 0;
	this.y = 0;
	this.tiles = [];//will contain images
	
	this.loadTiles = function(){
		m.tiles = [];
		for(var i = 0;i<world.tilesets.length;i++){
			m.tiles.push(new Image());
			m.tiles[i].src = "images/map/"+world.tilesets[i].image;
		}
	};	
	this.draw = function(){
		for(var l = 0;l<world.layers.length;l++){//loop trough layers
			var c = 0;
			for(var tY = 0;tY<world.layers[l].height;tY++){//draw every row
				var layer = world.layers[l];
				for(var tX = 0;tX<layer.width;tX++){
					var dat = layer.data[c];
					if(dat==1||dat==2){
						//ctx.drawImage(m.tiles[0], tX*world.tilewidth, tY*world.tileheight);
						ctx.drawImage(m.tiles[0], 0, (dat==1)?0:world.tileheight, world.tilewidth, world.tileheight,this.x+tX*world.tilewidth,this.y+tY*world.tileheight, world.tilewidth, world.tileheight);
					}
					c++;//C++ rules!
				}
			}
		}
	};
	this.loadTiles();
}
