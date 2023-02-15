//server_native.js
// Nos dépendances, http permet de lancer un serveur HTTP
// url va nous permettre de parser les url
var http = require('http');
var url = require('url'); // On crée notre serveur
var server = http.createServer(function(req, res) {
    // On parse l'url
    var route = url.parse(req.url).pathname;
    // On construit notre réponse
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (route == '/hello') {
	const { spawn } = require('node:child_process');
	const ls = spawn('ls', ['-lh', '/usr']);
	ls.stdout.on('data', (data) => {
	  res.write(`stdout: ${data}`);
	});
	ls.stderr.on('data', (data) => {
	  res.write(`stderr: ${data}`);
	});
	ls.on('close', (code) => {
	  res.write(`child process exited with code ${code}`);
	});
    }
    res.end();
});
// On lance notre serveur sur le port 8080
server.listen(8080);
