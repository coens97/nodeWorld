var webSocketServer = require('websocket').server;//include websocket library

wsServer = new webSocketServer({
    httpServer: httpServer
});
console.log("Websocket server started");

