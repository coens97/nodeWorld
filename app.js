console.log("Starting server");//say starting server
rootDir = __dirname;//so we now what is the root directory in other files
config = require('./config');//load config file

require("./server/main");//start server