const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: Array,
    }
});

mongoose.model('Manager',managerSchema);