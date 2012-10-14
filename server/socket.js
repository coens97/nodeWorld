var webSocketServer = require('websocket').server;//include websocket library
exports.startServer = function(httpServer){
        wsServer = new webSocketServer({
        httpServer: httpServer
    });
    console.log("Websocket server started");
};
