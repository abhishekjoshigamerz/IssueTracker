const mongoose = require('mongoose');
const labelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue'
    }],
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
});

const label = mongoose.model('Label',labelSchema);
module.exports = label;