const Project = require('../../models/project/project');

module.exports.home = async function(req,res){

    // brings 6 records in home page    
    const project =  await Project.find({})
    .sort('-createdAt')
    .limit(6);
    
    return res.render('index',
    {'title':'Home',
    'projects':project,
    }
    );
}