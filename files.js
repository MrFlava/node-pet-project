const fs = require('fs');

fs.readFile('./docs/blog.txt', (err, data) => {
    if (err){
        console.log(err);
    }
    console.log(data.toString());
});

// console.log('last line')

fs.writeFile('./docs/blog1.txt', 'hello world', () => {
    console.log('file was writtnen')
});