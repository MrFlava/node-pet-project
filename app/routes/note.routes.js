module.exports = (app) => {
    const posts = require('../controllers/note.controller.js');
    const commetns = require('../controllers/comment.controller.js');

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

    // Create a new comment for post
    app.post('/posts/comments', commetns.create);

    // Retrieve all comments with postId
    app.get('/posts/:postId/comments', commetns.findAll);

   // Retrieve comment with commentId
    app.get('/comments/:commentId', commetns.findOne);

    // Delete a comment with commentId
    app.delete('/comments/:commentId', commetns.delete);

}
