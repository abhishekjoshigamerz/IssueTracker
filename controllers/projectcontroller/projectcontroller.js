const Project = require('../../models/project/project');
const Issue = require('../../models/issue/issue');
module.exports.addproject = function(req,res){
    return res.render('projectform',{
        title: "Add Project"
    });
}


module.exports.viewproject = async function(req,res){
    let project     = await Project.findById(req.params.id);
    let issues      = await Issue.find({project_id:req.params.id}).sort('-createdAt');
    return res.render('viewprojectDetails',{
        title: "View Project",
        'project':project,
        'issues':issues
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