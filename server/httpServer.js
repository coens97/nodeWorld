var httpServer = require('http').createServer(httpHandler),//httpserrver
  fs = require('fs'),
  mime = require('mime'),
  url = require('url');
 
httpServer.listen(config.port);
var hello = "hey";
//http server
function httpHandler (req, res) {
    config.logHHTP&&console.log("Page loading:"+url.parse(req.url).href);//log when file is loaded when it's in config is configures
    var theUrl;
	if(url.parse(req.url).href=="/"){
		theUrl = "index.html";
	}
	else{
		theUrl = url.parse(req.url).href;
	}
  fs.readFile(rootDir + '/client/'+theUrl,
  function (err, data) {
    if (err) {
        config.logHHTP&&console.log("Page failed loading:"+url.parse(req.url).href);
	    res.writeHead(500);
        return res.end('Whazup dude\nJammer de pagina laadt niet');
    }
    res.writeHead(200, {'Content-Type':mime.lookup(theUrl)});
    res.end(data);
  });
}
