const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userid: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User',userSchema);