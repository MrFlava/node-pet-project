const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blog');

const mongoose = require('mongoose');

// connect to db
const dbConn = 'mongodb://localhost:27017/NodeTest'
mongoose.connect(dbConn).then((result) => {
    console.log('connected to MongoDB');
    // listen for requests
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});


// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
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

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'about some stuff',
        body: 'Lorem ipsum dolor dollar',
    });

    blog.save().then((result) => {
        res.send({result})
    }).catch((err) => {
        console.log(err);
    });
})

app.get('/all-blogs', (req, res) => {
    Blog.find({}).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/blog/:id', (req,res) => {
    Blog.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    })
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