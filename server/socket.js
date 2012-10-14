var webSocketServer = require('websocket').server;//include websocket library
exports.startServer = function(httpServer){
    exports.wsServer = new webSocketServer({
        httpServer: httpServer
    });
    console.log("Websocket server started");
    
    exports.wsServer.on('request', function(request) {
        var connection = request.accept(null, request.origin);

        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                // process WebSocket message
                console.log("Got message:"+message.utf8Data);
            }
        });
        connection.on('close', function(connection) {console.log("Lost connection with someone");});
    });
};