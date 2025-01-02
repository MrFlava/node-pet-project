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
app.use(express.urlencoded({extended: true}));
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
   res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((blogs) => {
        res.render('index', {title: 'All blogs', blogs});
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((blog) => {
        res.render('details', {blog: blog, title: 'Blog Details'});
    }).catch((err) => {
        console.log(err);
    })
});

app.post('/create', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => {
        console.log(result);
        res.redirect('/blogs');
    }).catch((err) => {
        console.log(err);
    })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Not found'});
});