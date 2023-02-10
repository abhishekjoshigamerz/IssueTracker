const Issue = require('../../models/issue/issue');
const Project = require('../../models/project/project');
module.exports.issueform = async function(req,res){
    let project = await Project.findById(req.params.id);

    console.log(req.params.id);
    return res.render('issue',{
        'title': "Add Issue",
        'project': project
    });
}


module.exports.createissue = async function(req,res){
    try {
        let id = req.params.id;
        const project = await Project.findById(req.body.projectID);
        if(project){
            let issue = {
                name:req.body.name,
                description:req.body.description,
                authorName:req.body.authorName,
                project_id:req.body.projectID
            }
            let issues = await Issue.create(issue);
            project.issue.push(issues);
            project.save();
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
    
}