const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Issue = require('../../models/issue/issue');
const Project = require('../../models/project/project');
const Label = require('../../models/label/label');
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
        let issuesByLabels = await Issue.find({labels: {$all: labels}});
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
        let issuesByTitleAndDescription = await Issue.find({$and:[{name: {$regex: `^${title}`, $options: 'i'}},{description: {$regex: `^${description}`, $options: 'i'}}]});

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
       
        let issuesByAuthor = await Issue.find({authorName: {$regex: authorName, $options: 'i'}});

        console.log('filter by author');
        return res.status(200).json({
            data:issuesByAuthor
        })              
    } catch (error) {
        console.log(error);
    }
}

module.exports.createissue = async function(req,res){
    try {
        let labels = req.body.labels;
        console.log(typeof labels);
        const newLabels = Object.values(labels).filter(val => !ObjectId.isValid(val));
        const oldLabels = Object.values(labels).filter(val => ObjectId.isValid(val));
        let allLabelsWithId = [];    
        if(oldLabels.length>0){
            allLabelsWithId.push(oldLabels);
        }
        
        //newLabels 



        // const newLabels = prepareArray(labels);
        if(newLabels.length > 0){
            const objectArray = newLabels.map(val => ({ name: val }));

            await Label.insertMany(objectArray, function(err, docs) {
                if (err){
                    return console.error(err);
                }
                else{
                    console.log("Multiple documents inserted to Collection");
                    console.log(docs._id);
                    let ids = docs.map(doc => doc._id);
                    console.log('IDS are', ids);
                    allLabelsWithId.push(ids);
                    console.log(` Labels is are  ${allLabelsWithId}`);
                   
                }
            });       
        } 

     
        const project = await Project.findById(req.body.projectID);
        if(project){
            let arra = ['63e9951ded54221a516fc622','63e8e6e8b8a285d68b1fbd0c'];
            let issue = {
                name:req.body.name,
                description:req.body.description,
                authorName:req.body.authorName,
                project_id:req.body.projectID,
                labels:[arra]
            }
            console.log('Line 110 ', issue);
            let issues = await Issue.create(issue);
            project.issue.push(issues);
            project.save();
            const singleDimensionalArray = allLabelsWithId.reduce((acc, val) => acc.concat(val), []);
            console.log(singleDimensionalArray);
            let re = [];
       
            console.log(re);
            issues.labels.push(arra);
            issues.save();
            res.send(typeof allLabelsWithId + ' and is '+ allLabelsWithId + ' is array ' + Array.isArray(allLabelsWithId));
            // const labelArray = allLabelsWithId.map(label => mongoose.Types.ObjectId(label));
            
            
            
            // const objectIds = allLabelsWithId.map(str => ObjectId(str));
            // objectIds.forEach(labelId => {
            //     let labelsID = mongoose.Types.ObjectId(labelId);
            //     issues.labels.push(labelsID);
            // });
            // issues.save();
            // return res.send('It worked');
            // return res.redirect('/');
        }   
            
        return res.send('Error');
        
    } catch (error) {
        console.log(error);
    }
    
}