const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type and write
    res.setHeader('Content-Type', 'text/html');

    // send an html file
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end('error');
        } else {
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', (err) => {
    console.log('server running on port 3000');
});