var express = require('express');
var compression = require('compression');
var httpProxy = require('http-proxy');
var API_HOST = process.env.API_HOST || 'localhost:8080/api';
var PORT = process.env.SERVER_PORT || 3030;

// Initialize
var app = express();
var apiProxy = httpProxy.createProxyServer();

// Serve static resources from 'build' folder
// app.use(express.static('build'));

// Enable gzip response compression
app.use(compression());

// Proxy all the api requests
app.all('/*', (req, res) => {
  // console.log('proxy req ', res);
  apiProxy.web(req, res, { target: `http://${API_HOST}` }, err => {
    console.log('Proxy error: ', err);
  });
});

// Otherwise serve index.html
// app.get('*', function(req, res) {
//   res.sendfile('/build/index.html');
// });

app.listen(PORT);

console.log('Running on port ' + PORT + ' with API_HOST:' + API_HOST);
