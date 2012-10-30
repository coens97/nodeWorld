function menu(){
    this.sprites = {
    	//bg
    	bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,980,720),
    	bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        rooms : new text("#FFFFFF","Rooms",80,0),
        rightSide : new vGrad({0:"#353535",0.1:"#565656",0.9:"#565656",1:"#353535"},980,100,300,620),
        hostButton : new button("Host",1000,220,260,80)
    };
    this.sprites.rooms.font = "72pt Arial";
    
	this.startScene = function(){
		document.getElementById("roomList").style.display = "block";
	};
	this.stopScene = function(){
		document.getElementById("roomList").style.display = "none";
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
    this.mouseDown = function(x,y){
        if(this.sprites.hostButton.checkMouse(x,y)){//when host game button is pressed
        	game.startScene(4);
        }
    };
    this.keyDown = function(key){
    
    };
    socket.on('rooms',function(data){//when the rooms update
    	var list = document.getElementById("rooms");
    	list.innerHTML = "";
    	for(var i = 0; i < data.length;i++){//loop trough rooms
    		list.innerHTML += "<tr onclick=\"roomClick('"+data[i].name+"')\"><td>"+data[i].name+"</td><td>"+data[i].players+"</td></tr>";
    	}
    	if(data.length == 0){//if there are no rooms
    		list.innerHTML += "<tr><td>No rooms available</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
    	}
    });
    socket.on('toRoom',function(data){
    	if(data==1){
    		console.log("Go to the waitRoom");
    		game.startScene(5);
    	}else{
    		console.log("Something went wrong with going to this room");
    	}
    });
}

function roomClick(name){
	console.log("Want to join room "+name);
	socket.emit('toRoom',name);
}
