const http = require('http')

const server = http.CreateServer((req, res) => {
    console.log('request made');
});

server.listen(3000, 'localhost', (err) => {
    console.log('server running on port 3000');
});