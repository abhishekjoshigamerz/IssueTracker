const Project = require('../../models/project/project');
const Issue = require('../../models/issue/issue');
const Label = require('../../models/label/label');
const { faker } = require('@faker-js/faker');
module.exports.addproject = function(req,res){
    return res.render('projectform',{
        title: "Add Project"
    });
}


module.exports.viewproject = async function(req,res){
    let project = await Project.findById(req.params.id);
    let issues  = await Issue.find({project_id:req.params.id}).sort('-createdAt');
    let labels = await Label.find({}).sort('-createdAt');
   
    if(req.xhr){
        return res.status(200).json({
            data:{
                'project':project,
                'issues':issues,    
                "labels":labels
            },
            message: "Project and Issues fetched"
        });
    }

    
    return res.render('viewprojectDetails',{
        title: "View Project",
        'project':project,
        'issues':issues,
        "labels":labels
    });
}

module.exports.addFakeData = async function(req,res){
    var product = await new Project();

    product.name = req.body.name
    product.description = req.body.description
    product.authorName = req.body.authorName
    

    await product.save(function(err) {
        if (err) throw err
        res.redirect('/project/add-fake-data');
    });

   
}

//to be removed
module.exports.generateFakeData = async function(req,res){
    for (let i = 0; i < 90; i++) {
        let project = new Project();
        project.name = faker.name.fullName();
        project.description = faker.lorem.sentence();
        project.authorName = faker.name.firstName();
        project.save(function(err) {
            if (err) throw err
            
        });
        res.redirect('/project/addFakeData');
    }

}

//get all projects 

module.exports.getAllProjects = async function(req,res){
        let perPage = 12;
        let page = req.params.page || 1;

        Project.
            find({}).
            skip((perPage * page) - perPage).
            limit(perPage).
            exec(function(err, projects) {
                Project.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('project', {
                        title:"Projects",
                        projects: projects,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
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