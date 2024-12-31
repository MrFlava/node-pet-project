const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new log request:');
    console.log('host', req.hostname);
    console.log('path', req.path);
    console.log('method', req.method);
    next();
})

app.use((req, res, next) => {
    console.log('next middleware');
    next();
})

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Express server example', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create blog'})
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Not found'});
})