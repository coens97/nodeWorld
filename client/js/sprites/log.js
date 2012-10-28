function log(){
	var parent = this;
	this.x = 50;
	this.y = 670;
	this.yd = 40;
	this.logs = [];
	this.draw = function(){
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "left"; 
		ctx.font = "bold 20px sans-serif";
		for (var i = this.logs.length-1,b=0; i >= 0; i--,b++){
			ctx.fillText(this.logs[i], this.x, this.y-b*this.yd);
		}
	};
	this.pop = function(){
		parent.logs.shift();
	};
	this.push = function(inp){
		this.logs.push(inp);;
		setTimeout(this.pop,4000);
	}
}