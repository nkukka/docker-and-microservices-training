var http = require('http');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'index.html');

var handleRequest = function(request, response) {
console.log('Received request for URL: ' + request.url);
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
  if (!err) {
      console.log('received data: ' + data);
      response.writeHead(200);
      response.end(data);
  } else {
      console.log(err);
      response.writeHead(400);
      response.end('Error');
}
})
};
var www = http.createServer(handleRequest);
www.listen(8080);