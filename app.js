//var requirejs = require('requirejs');//so we could include files in project the same way the client does

//require(['server/httpServer']);

var connect = require('./connect');
connect.createServer(
    connect.static(__dirname)
).listen(80);