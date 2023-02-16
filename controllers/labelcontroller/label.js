const Label = require('../../models/label/label');

const {  validationResult } = require('express-validator');

module.exports.showlabels = async function(req,res){
    const label = await Label.find({}).sort('-createdAt');

    return res.render('showlabel',{
        'title': "Add Label",
        'labels':label
       
    });
}

module.exports.createLabel = async function(req,res){
    try{
        req.flash('error',''); //clearing the flash error
        const labels = await Label.find({}).sort('-createdAt');
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            
            let message = ``;
            
            for(let i=0;i<errors.errors.length;i++){
                console.log(errors.errors[i].msg);
                message += `${errors.errors[i].msg} `;
            }
            req.flash('error',message);
            return res.redirect('back');
        }

        let label = await Label.create({name: req.body.name});
        label.save();
        req.flash('success','Label created successfully');
        return res.redirect('/labels/all-labels/');
    }catch(err){
        console.log('Error',err.code);
        if(err.code == '11000'){
            req.flash('error','Label name should be unique');
            return res.redirect('back');
        }else{
            req.flash('error',`Error encounter Code is ${err.code}`);
            return res.redirect('back');
        }
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