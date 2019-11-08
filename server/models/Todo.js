const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        unique: true,
    },
    done: {
        type: Boolean,
    }
});

mongoose.model('Todo', TodoSchema);