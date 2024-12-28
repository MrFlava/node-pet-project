const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type and write
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;

        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;

        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
            break;

        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
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