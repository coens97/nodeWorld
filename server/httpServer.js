var Connect = require('./connect');
Connect.createServer(
	//Connect.logger(), // Log responses to the terminal using Common Log Format.
	Connect.static(rootDir+"/client/")
).listen(appPort,function(){console.log("HTTP server running on "+appPort);});
