module.exports = (app) => {
    const posts = require('../controllers/note.controller.js');
    const commetns = require('../controllers/comment.controller.js');
    const authMiddleware = require('../middleware/authMiddleware');
    const roleMiddleware = require('../middleware/roleMiddleware');

    // Create a new Post
    app.post('/posts', roleMiddleware(["USER"]), posts.create);

    // Retrieve all Posts
    app.get('/posts', roleMiddleware(["USER"]), posts.findAll);

    // Retrieve a single Post with postId
    app.get('/posts/:postId', roleMiddleware(["USER"]), posts.findOne);

    // Update a Post with postId
    app.put('/posts/:postId', roleMiddleware(["USER"]),posts.update);

    // Delete a Post with postId
    app.delete('/posts/:postId', roleMiddleware(["USER"]), posts.delete);

    // Create a new comment for post
    app.post('/posts/comments', roleMiddleware(["USER"]), commetns.create);

    // Retrieve all comments with postId
    app.get('/posts/:postId/comments', roleMiddleware(["USER"]), commetns.findAll);

   // Retrieve comment with commentId
    app.get('/comments/:commentId', roleMiddleware(["USER"]), commetns.findOne);

    // Delete a comment with commentId
    app.delete('/comments/:commentId', roleMiddleware(["USER"]), commetns.delete);

}
