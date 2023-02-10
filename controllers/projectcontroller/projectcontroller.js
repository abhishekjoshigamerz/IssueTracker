const Project = require('../../models/project/project');
const Issue = require('../../models/issue/issue');
const Label = require('../../models/label/label');
module.exports.addproject = function(req,res){
    return res.render('projectform',{
        title: "Add Project"
    });
}


module.exports.viewproject = async function(req,res){
    let project = await Project.findById(req.params.id);
    let issues  = await Issue.find({project_id:req.params.id}).sort('-createdAt');
    let labels = await Label.find({}).sort('-createdAt');
    return res.render('viewprojectDetails',{
        title: "View Project",
        'project':project,
        'issues':issues,
        "labels":labels
    });
}

module.exports.createproject =  async function(req,res){
    try {
        const data = {
            name:req.body.name,
            description:req.body.description,
            authorName:req.body.authorName,
        }
        let post = await Project.create(data);   
        post.save();
    
        
        return res.redirect('/');     
    } catch (error) {
        console.log(`Error: ${error}`);
    }
   
}