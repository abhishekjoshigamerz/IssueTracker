const Project = require('../../models/project/project');
module.exports.home = async function(req,res){
    console.log('Home Controller');
    const project =  await Project.find({})
    .sort('-createdAt')
    .limit(6);

    console.log(project);
    return res.render('index',
    {'title':'Home',
    'projects':project,
    }
    );
}