var carImage = new Image();
carImage.onload = function() {//callback for when image loaded 
	console.log("Cars images loaded");
};
carImage.src = "images/cars.png";

function car(id,dir,x,y){//this is an object
    /******directions******
     * 0:top
     * 1:right
     * 2:down
     * 3:left
     *********************/
    this.id = id;
    this.dir = dir;
    this.x = x;
    this.y = y;
    this.v = 0;
    this.r = 0;
    
    this.loop = function(){
 	
    };
    this.draw = function(){
    	if(this.dir==0||this.dir==2){//draw vertical
			ctx.drawImage(carImage, 98,(this.id*128)+((this.dir==2)?0:64) , 62, 64, this.x, this.y, 62, 64);
		}else{
			ctx.drawImage(carImage, 0,(this.id*128)+((this.dir==1)?0:64) , 98, 64, this.x, this.y, 98, 64);
		}
    };
}