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

function objectAr(){
	this.ar = []
	this.draw = function(){
		for(var i = 0;i < this.ar.length;i++){
			this.ar[i].draw();
		}
	}
}