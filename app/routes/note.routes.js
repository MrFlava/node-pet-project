module.exports = (app) => {
    const posts = require('../controllers/note.controller.js');

    // Create a new Post
    app.post('/posts', posts.create);

    // Retrieve all Posts
    app.get('/posts', posts.findAll);

    // Retrieve a single Post with postId
    app.get('/posts/:postId', posts.findOne);

    // Update a Post with postId
    app.put('/posts/:postId', posts.update);

    // Delete a Post with postId
    app.delete('/posts/:postId', posts.delete);
}
