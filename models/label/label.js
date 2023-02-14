const mongoose = require('mongoose');
const labelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
});

const label = mongoose.model('Label',labelSchema);
module.exports = label;