function button(string,x,y,w,h,fontSize){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.r = 5;
	this.text = new text("#000000",string,this.x+this.w/2,this.y+5);
	this.text.textAlign = "center";
	(typeof(fontSize)=='undefined')&&(fontSize=50);
	this.text.font = fontSize + "pt Arial";
	
	//start gradient
	this.lingrad = ctx.createLinearGradient(this.x,this.y,this.x,this.y+this.h);
	this.lingrad.addColorStop(0,"#f2f6f8");
	this.lingrad.addColorStop(0.5,"#d8e1e7");
	this.lingrad.addColorStop(0.5,"#b5c6d0");
	this.lingrad.addColorStop(1,"#e0eff9");
	
	this.draw = function(){
		ctx.fillStyle = this.lingrad;
		//rounded rect
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
		//done rounded rect
		ctx.fill();
		//draw text
		this.text.draw();
	};
	this.checkMouse = function(x,y){
		if(this.x<x&&this.x+this.w>x//check horizontal collision
			&&this.y<y&&this.y+this.h>y){
			return true;
		}else{
			return false;
		}
	}	
}
