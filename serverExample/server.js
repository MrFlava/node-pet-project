const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type and write
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>helllooooooo!</p>');
    res.write('<p>again!</p>');
    res.end();
});

server.listen(3000, 'localhost', (err) => {
    console.log('server running on port 3000');
});