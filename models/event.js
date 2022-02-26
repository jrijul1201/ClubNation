const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: String,
        required: true,
        min: 1
    },
    time: {
        type: String,
        required: true,
        min: 1
    },
    reglink: {
        type: String,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        min: 1
    },
   
   Eresources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model('Event', EventSchema);