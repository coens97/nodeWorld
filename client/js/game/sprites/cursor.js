/****************
*Change cursor in gameplay
*****************/
function cursor(){
	this.draw = function(){
		//draw cursor
		ctx.beginPath();
		//line left
    	ctx.moveTo(mouse.x-50, mouse.y);
    	ctx.lineTo(mouse.x-25, mouse.y);
    	//line right
    	ctx.moveTo(mouse.x+25, mouse.y);
    	ctx.lineTo(mouse.x+50, mouse.y);
    	//line up
    	ctx.moveTo(mouse.x, mouse.y-50);
    	ctx.lineTo(mouse.x, mouse.y-25);
    	//line down
    	ctx.moveTo(mouse.x, mouse.y+25);
    	ctx.lineTo(mouse.x, mouse.y+50);
        //draw it
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 4;
        ctx.stroke();
	};
}