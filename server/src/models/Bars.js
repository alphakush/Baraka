const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    barid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: Array,
    },
    coordgps: {
        type: String,
        unique: true,
    }
});

mongoose.model('Bar',barSchema);