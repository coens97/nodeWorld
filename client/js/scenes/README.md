# Scenes
Every scene needs this functions
* startScene
* stopScene
* loop
* draw
* mouseDown
* keyDown

# Examples
If you don't need the function just leave the function empty
Example:
<pre>
function intro(){
    this.sprites = {
        bg : new rect("000000",0,0,1280,720)    
    };
    this.startScene = function(){
    
    };
    this.stopScene = function(){
		
	};
    this.loop = function(){
        
    };
    this.draw = function(){
        /***********
         * loop trough all sprites and draw it on canvas
         ***********/     
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
    this.mouseDown = function(x,y){
        
    };
    this.keyDown = function(key){
    
    };
}
</pre>