const { body } = require('express-validator');
module.exports.projectValidators = function(req,res,next){
    return [
    body('name').not().isEmpty().withMessage('Project name should not be empty'),
    body('description').not().isEmpty().withMessage('Project description should not be empty'),
    body('authorName').not().isEmpty().withMessage('Project author name should not be empty'),
    ];
    
}

module.exports.labelValidators = function(req,res){
    return [
        body('name').isLength({min:3}).withMessage('Label length should be minimum of 3 words')
    ];
}
