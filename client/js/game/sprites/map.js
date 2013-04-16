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
		for(var l = 0;l<world.layers.length;l++){//loop trough layers
			var layer = world.layers[l];
			var c = 0;
			var yMax = Math.round((this.y*-1)/world.tileheight)+23;
			var xMin = Math.round((this.x*-1)/world.tilewidth)-1;
			var xMax = xMin+42;
			if(xMax>layer.width){xMax=layer.width;}
			if(xMin<0){xMin=0;}
			for(var tY = Math.round((this.y*-1)/world.tileheight)-1;tY<world.layers[l].height&&tY<yMax;tY++){//draw every row
				c = world.width*tY + xMin;
				for(var tX = xMin;tX<xMax;tX++){
					var dat = layer.data[c];
					if(dat!=0){
						var t = 0;//current tile we only have 1 tile
						var imgX,
							imgY;
						if(l==0){
							imgX = (dat % (m.tileW)-1)*world.tilesets[t].tilewidth;
							imgY = Math.round((dat/m.tileW)-0.5)*world.tilesets[t].tileheight;
							if(dat % (m.tileW)==0){//check if it's the most right image
								imgX = (m.tileW - 1)*world.tilesets[t].tilewidth;
								imgY -= world.tilesets[t].tileheight;
							}
						}else{
							imgX = 0;
							imgY = (dat-world.tilesets[l].firstgid)*world.tilesets[l].tileheight;
							if(typeof gameRoom.inactiveGuns[c] != 'undefined'){
								c++;
								continue;
							}
						}
						ctx.drawImage(m.tiles[l], imgX ,imgY ,world.tilesets[l].tilewidth, world.tilesets[l].tileheight,this.x+tX*world.tilewidth,this.y+tY*world.tileheight, world.tilesets[l].tilewidth, world.tilesets[l].tileheight);
					}
					c++;//C++ rules!
				}
			}
		}
	};
	this.loadTiles();
}

