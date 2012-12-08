/*
 * ----------------------------------------------------------------------------
 * "THE FRIES LICENSE":
 * Coen wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me some fries
 * ----------------------------------------------------------------------------
 */
now = function(){
  var d = new Date();
  return '\u001b[0;36m'+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" - "+'\u001b[0m';
}

rootDir = __dirname;//so we now what is the root directory in other files
config = require('./config');//load config file

console.log(now()+"Starting server on "+config.port);//say starting server

require("./server/main");//start server
