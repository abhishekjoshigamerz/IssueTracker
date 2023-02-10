// const Label = require('../models/label/label');

module.exports.showlabels = async function(req,res){
    // const label = await Label.find({}).sort('-createdAt');

    return res.render('showlabel',{
        'title': "Add Label"
       
    });
}