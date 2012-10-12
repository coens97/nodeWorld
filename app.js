rootDir = __dirname;//so we now what is the root directory in other files
appPort = process.env.PORT;

var requirejs = require('requirejs');//so we could include files in project the same way the client does

requirejs.config({
    nodeRequire: require
});

requirejs(['server/httpServer']);
