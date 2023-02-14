const Label = require('../../models/label/label');

module.exports.showlabels = async function(req,res){
    const label = await Label.find({}).sort('-createdAt');

    return res.render('showlabel',{
        'title': "Add Label",
        'labels':label
       
    });
}

module.exports.createLabel = async function(req,res){
    try{
        let label = await Label.create({name: req.body.name});
        label.save();

        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
    }

      
};

module.exports.deleteLabel = async function(req,res){

    try {
        await Label.deleteOne({_id:req.params.id});
        return res.redirect('back');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//get suggestions by ajax call
module.exports.getSuggestions = async function(req,res){
    try {
        let result = await Label.find({name: { $regex: req.body.label, $options: 'm'}});

        if(result){
            return res.status(200).json(result);
        }else{
            return res.status(200).json({
                message: 'No suggestions found'
            });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

//get label values
module.exports.getLabelValues = async function(req,res){
    try {
        
        let result = await Label.find({_id:req.params.id});
        
        return res.status(200).json(result);        
    
    } catch (error) {
        console.log(error);
    }
};