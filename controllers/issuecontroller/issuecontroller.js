const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Issue = require('../../models/issue/issue');
const Project = require('../../models/project/project');
const Label = require('../../models/label/label');
const { validationResult } = require('express-validator');


//add issue form to add issues
module.exports.issueform = async function(req,res){
    let project = await Project.findById(req.params.id);

    console.log(req.params.id);
    return res.render('issue',{
        'title': "Add Issue",
        'project': project
    });
}


//filter by labels
module.exports.filterByLabels = async function(req,res){

    try{
        let labels = req.body.labels;
        let projectId = req.body.projectID;
        let issuesByLabels = await Issue.find({labels: {$all: labels},project_id:projectId});
        console.log('filter by labels');
        return res.status(200).json({
            data:issuesByLabels
        });
    }catch(error){
        console.log(error);
    }
}


//filter by title and description
module.exports.filterByTitleAndDescription = async function(req,res){
    try {
        let title = req.body.title;
        let description = req.body.description;
        let issuesByTitleAndDescription = await Issue.find({$and:[
            {name: {$regex: `^${title}`, $options: 'i'}},
            {description: {$regex: `${description.replace(/\s+/g, '|')}`, $options: 'i'},
           
        }, {project_id:req.body.projectID}
    ]});

        console.log('filter by title and description');
        return res.status(200).json({
            data:issuesByTitleAndDescription
        })              
    } catch (error) {
        console.log(error);
    }
}



//filterbyAuthor
module.exports.filterByAuthor = async function(req,res){
    try {
        let authorName = req.body.name;
       
        let issuesByAuthor = await Issue.find({authorName: {$regex: `^${authorName}`, $options: 'm'},project_id:req.body.projectID});

        console.log('filter by author');
        return res.status(200).json({
            data:issuesByAuthor
        })              
    } catch (error) {
        console.log(error);
    }
}

//creates Issue
module.exports.createissue = async function(req,res){
    try{
        const errors = validationResult(req);
        req.flash('error','');
        if (!errors.isEmpty()) {
            
            let message = [];
            
            for(let i=0;i<errors.errors.length;i++){
                console.log(errors.errors[i].msg);
                message.push(`${errors.errors[i].msg}`);
            }
            
            console.log(`message here is ${message}}`);
            req.flash('error', message);

            return res.redirect('back');
        }

        //1. find the labels
        let labels  = req.body.labels;
       
        let newlabes = [];
        //2. find the project
        const project  = await Project.findById(req.body.projectID);
        let issue = {
            name:req.body.name,
            description:req.body.description,
            authorName:req.body.authorName,
            project_id:req.body.projectID,
        }
        let issues = await Issue.create(issue);
        if(project){
            //3. check if issue id are object ids or not
            await Promise.all(labels.map(async label => {
                if(!ObjectId.isValid(label)){
                    console.log('Not valid object id');
                    //insert the label in the label collection
                    const newLabel = await Label.create({name:label});
                    console.log(newLabel);
                    let data = await newLabel.save();
                    
                    console.log(`New label created id is ${newLabel._id}`);
                    let newlabelID = newLabel._id;
                    newlabelID = newlabelID.toString();
                    console.log(`nwew labels are ${typeof newlabelID}`);
                    await issues.labels.push(newLabel);
                    newlabes.push(newlabelID); 
                    console.log(data);
                }else{
                    console.log(`Valid object id${typeof label}` );
                    await issues.labels.push(label);
                    
                    console.log('Label array inserted');
                }
            }));

            
            await issues.save();
            await project.issue.push(issues);
            await project.save();
            
            return res.redirect('/');

        }

    }catch(error){
        
        //returns error message back to the form
        return res.redirect('back',{
            message:error._message    
        });
    }
    
}