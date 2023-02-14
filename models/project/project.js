const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true

    },
    authorName:{    
        type:String,
        required:true
    },
    issue:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue' 
    }]
},{
    timestamp:true
});

const project = mongoose.model('project',projectSchema);
module.exports = project;
