/*
 * ----------------------------------------------------------------------------
 * "THE FRIES LICENSE":
 * Coen wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me some fries
 * ----------------------------------------------------------------------------
 */
console.log("Starting server");//say starting server
rootDir = __dirname;//so we now what is the root directory in other files
config = require('./config');//load config file

require("./server/main");//start server