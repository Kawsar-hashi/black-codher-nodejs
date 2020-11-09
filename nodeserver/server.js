const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = '8080';

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end ('Hello World!');

});

server.listen(port, hostname , () => {
    console.log('Server running at http://${hostname}: ${port}')

});