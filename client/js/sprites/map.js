function map(world){
	var m = this;
	this.x = 0;
	this.y = 0;
	this.tiles = [];//will contain images
	
	this.tileW = world.tilesets[0].imagewidth / world.tilesets[0].tilewidth;//the count of tiles in width
	this.tileH = world.tilesets[0].imageheight / world.tilesets[0].tileheight;
	this.loadTiles = function(){
		m.tiles = [];
		for(var i = 0;i<world.tilesets.length;i++){
			m.tiles.push(new Image());
			m.tiles[i].src = "images/map/"+world.tilesets[i].image;
		}
	};	
	this.draw = function(){
		ctx.save();
		ctx.translate(640,360);
		for(var l = 0;l<world.layers.length;l++){//loop trough layers
			var c = 0;
			for(var tY = 0;tY<world.layers[l].height;tY++){//draw every row
				var layer = world.layers[l];
				for(var tX = 0;tX<layer.width;tX++){
					var dat = layer.data[c];
					if(dat!=0){
						var t = 0;//current tile we only have 1 tile
						var imgX = ((dat % m.tileW)-1)*world.tilesets[t].tilewidth;
						var imgY = Math.round((dat/m.tileW)-0.5)*64;
						ctx.drawImage(m.tiles[t], imgX ,imgY ,world.tilesets[t].tilewidth, world.tilesets[t].tileheight,this.x+tX*world.tilewidth,this.y+tY*world.tileheight, world.tilesets[t].tilewidth, world.tilesets[t].tileheight);
					}
					c++;//C++ rules!
				}
			}
		}
		ctx.restore();
	};
	this.loadTiles();
}

