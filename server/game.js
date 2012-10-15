/*****************
 * game.js
 ****************/
this.connections = 0;
 
this.newConnection = function(socket){
	//here must al the user specific stuff
	console.log("New connection");
	
	socket.on('echo', function (data) {//for debugging
		console.log("Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	
	socket.on('disconnect', function () {
		console.log("Somebody disconnected");
	});
}

