function nickname(){
    this.sprites = {
        bg : new rect("#DDDDDD",0,0,1280,720),
    };
	this.startScene = function(){
		document.getElementById("nickname").style.display = "block";
		document.getElementById("button").addEventListener('click', this.sendNickname , false);
	};
    this.loop = function(){
		
    };
    this.draw = function(){
        /***********
         * loop trough all sprite and draw it on canvas
         ***********/     
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
    this.mouseDown = function(x,y){};
    
    this.keyDown = function(key){
    
    };
    
    this.sendNickname = function(){
    	var value = document.getElementById("inputName").value;
    	(value == "")&&(value = "nameless");
    	alert(value);
    };
    
}
