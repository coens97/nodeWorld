/*****************
 * game.js
 ****************/
var stats = require("./stats");
this.connections = 0;
 
this.newConnection = function(socket){
	//here must al the user specific stuff
	console.log("New connection "+ ++stats.connections);//also add 1 connection to the count 
	
	
	socket.on('echo', function (data) {//for debugging
		console.log("Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	
	socket.on('disconnect', this.disconnect);
}
this.disconnect = function(){
	console.log("Somebody disconnected "+this.connections);
	stats.connections--;
}
