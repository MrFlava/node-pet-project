const fs = require('fs');

// reading files
fs.readFile('./docs/blog.txt', (err, data) => {
    if (err){
        console.log(err);
    }
    console.log(data.toString());
});

// writing files
fs.writeFile('./docs/blog1.txt', 'hello world', () => {
    console.log('file was writtnen')
});

// directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err){
            console.log(err);
        }

        console.log('folder created')
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err){
            console.log(err);
        }
        console.log('folder removed')
    })
}

// deleting files
if (fs.existsSync('./docs/deletting.txt')){
    fs.unlink('./docs/deletting.txt', (err) => {
        if (err){
            console.log(err);
        }
        console.log('file deleted');
    })
}