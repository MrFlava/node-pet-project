const Comment = require('../models/comment.model.js');
const Post =  require('../models/note.model.js');


// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Comment content can not be empty"
        });
    }

    if(!req.body.post_id) {
        return res.status(400).send({
            message: "Post id can not be empty"
        });
    }

    // Create a Post
    const comment = new Comment({
        post_id: req.body.post_id,
        title: req.body.title || "Untitled comment",
        content: req.body.content
    });

    // Save Post in the database
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        });
    });
};

// Retrieve and return all Comments with postId from the database.
exports.findAll = (req, res) => {
    Comment.find({post_id: req.params.postId})
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params.commentId
        });
    });
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        res.send({message: "Comment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Comment not found with id " + req.params.commentId
            });
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params.commentId
        });
    });
};
