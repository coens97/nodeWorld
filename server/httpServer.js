var app = require('http').createServer(handler),
  main = require('./server/main'),
  fs = require('fs'),
  mime = require('mime'),
  url = require('url');
 
app.listen(config.port);
//http server
function handler (req, res) {
    console.log("Page loading:"+url.parse(req.url).href);
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
	  res.writeHead(500);
      return res.end('Whazup dude\nJammer de pagina laadt niet');
    }
    res.writeHead(200, {'Content-Type':mime.lookup(theUrl)});
    res.end(data);
  });
}
