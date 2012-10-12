rootDir = __dirname;//so we now what is the root directory in other files
config = require('./config.js');

var requirejs = require('requirejs');//so we could include files in project the same way the client does

requirejs(['server/httpServer']);
