
const mongoose = require('mongoose');

const CommentSchema =  mongoose.Schema({
    post_id: String,
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
