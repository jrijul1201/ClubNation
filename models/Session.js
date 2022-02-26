const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        min: 1
    },
    media: {
        type: String,
        required: true,
        min: 5
    }
});
const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    img: {
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
    mlink: {
        type: String,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        min: 1
    },
    rlink: {
        type: String,
        required: true,
        min: 1
    },
    // resources: [{
    //     type: ResourceSchema,
    //     required :true,
    // }]
    // resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
});

module.exports = mongoose.model('Session', SessionSchema);