const mongoose = require('mongoose');
const issueSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project' 
    },
    labels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Label'
    }],
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }

},{
    timestamp:true
});

const issue = mongoose.model('issue',issueSchema);
module.exports = issue;