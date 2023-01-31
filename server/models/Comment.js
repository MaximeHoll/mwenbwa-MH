const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tree_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tree'
    },
    content: {
        type: String,
        required: true,
    }
})





module.exports = mongoose.model('Comment', commentSchema)