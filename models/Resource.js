const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        min : 1
    },
    description :{
        type : String,
        required : true,
        min : 1
    },
    media :{
        type : String,
        required : true,
        min : 5
    }
});

module.exports = mongoose.model('Resource',ResourceSchema);