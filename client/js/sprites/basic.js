/**************
 *Sprites 
 *************/
function rect(color,x,y,w,h){//this is an object
    /***usage***
     * var someRect = new rect("ffffff",10,20,300,200);//to create new rect
     * someRect.draw();//to draw rect in canvas
     *********/
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.draw = function(){//you can call this with someRect.draw()
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.fill();
    };
}

function roundRect(color,x, y, w, h, r) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.r, this.y);
        ctx.lineTo(this.x + this.w - this.r, this.y);
        ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);
        ctx.lineTo(this.x + this.w, this.y + this.h - this.r);
        ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h);
        ctx.lineTo(this.x + this.r, this.y + this.h);
        ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);
        ctx.lineTo(this.x, this.y + this.r);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);
        ctx.closePath();
        ctx.fill();
    };
    this.checkMouse = function(x,y){
        if(this.x<x&&this.x+this.w>x//check horizontal collision
            &&this.y<y&&this.y+this.h>y){
            return true;
        }else{
            return false;
        }
    };         
}

function text(color,string,x,y){//this is an object
    this.color = color;
    this.string = string;
    this.x = x;
    this.y = y;
    this.font = "32pt Arial";
    this.textAlign = "left";
    this.draw = function(){//you can call this with someRect.draw()
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = 'top';
        ctx.fillText(this.string, this.x, this.y);
    };
}

function image(url,x,y,w,h){//this is an object
    //usage is simular to rect but instead of color you put imageurl
    
    this.url = url;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //load image
    
    this.theImage = new Image();
    this.theImage.onload = function() {//callback for when image loaded 
        console.log("image loaded:"+url);
    };
    this.theImage.src = this.url;
    this.draw = function(){
		if(this.w!=undefined){
			ctx.drawImage(this.theImage, this.x, this.y,this.w,this.h);
		}else{
			ctx.drawImage(this.theImage, this.x, this.y);
		}
    };
}
function partImage(url,x,y,w,h,sx,sy,sw,sh){//this is an object
    //usage is simular to rect but instead of color you put imageurl
    this.url = url;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sw = sw;
    this.sh = sh;
    this.sx = sx;
    this.sy = sy;
    //load image
    this.theImage = new Image();
    this.theImage.src = this.url;
    this.draw = function(){
		ctx.drawImage(this.theImage,this.sx*this.sw,this.sy*this.sh,this.sw,this.sh, this.x, this.y,this.w,this.h);
    };
}

function pImage(image,x,y,w,h,sx,sy,sw,sh){//part of image but no url
    //usage is simular to rect but instead of color you put imageurl
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sw = sw;
    this.sh = sh;
    this.sx = sx;
    this.sy = sy;
    //load image
    this.theImage = image;
    this.draw = function(){
        ctx.drawImage(this.theImage,this.sx*this.sw,this.sy*this.sh,this.sw,this.sh, this.x, this.y,this.w,this.h);
    };
}

function hGrad(input,x,y,w,h){
	this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	
	this.lingrad = ctx.createLinearGradient(this.x,this.y,this.x+this.w,this.y);
	for(var step in input){
		this.lingrad.addColorStop(step, input[step]);
	}
	this.lingrad;
	this.draw = function(){//you can call this with someRect.draw()
        ctx.fillStyle = this.lingrad;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.fill();
    };
}

function vGrad(input,x,y,w,h){
	this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	
	this.lingrad = ctx.createLinearGradient(this.x,this.y,this.x,this.y+this.h);
	for(var step in input){
		this.lingrad.addColorStop(step, input[step]);
	}
	this.lingrad;
	this.draw = function(){//you can call this with someRect.draw()
        ctx.fillStyle = this.lingrad;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.fill();
    };
}

function objectArr(arr){
	this.ar = arr||[]
	this.draw = function(){
		for(var i = 0;i < this.ar.length;i++){
			this.ar[i].draw();
		}
	};
	this.loop = function(){
		for(var i = 0;i < this.ar.length;i++){
			this.ar[i].loop();
		}
	};
}
function objectAr(arr){
    this.ar = arr||{};
    this.draw = function(){
        for(var ob in this.ar){
            this.ar[ob].draw();
        }
    };
    this.loop = function(){
        for(var ob in this.ar){
            this.ar[ob].loop();
        }
    };
}