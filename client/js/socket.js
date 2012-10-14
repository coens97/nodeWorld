 // if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('ws://racing.coens97_1.c9.io:3000');
connection.onopen = function () {
    // connection is opened and ready to use
    alert("We have connection!");
};
connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    alert("Something went wrong");
};
connection.onmessage = function (message) {
    // try to decode json (I assume that each message from server is json)
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }
    // handle incoming message
    console.log(meassage.data);
};