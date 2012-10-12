rootDir = __dirname;//so we now what is the root directory in other files
appPort = (process.env.PORT===undefined)?3000:process.env.PORT;//Do port 80 when it's not defined in node

var requirejs = require('requirejs');//so we could include files in project the same way the client does

requirejs(['server/httpServer']);
