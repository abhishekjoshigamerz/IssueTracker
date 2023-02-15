const { body } = require('express-validator');

// validates all enteries for there required values before saving to database

module.exports.projectValidators = function(){
    return [
    body('name').not().isEmpty().withMessage('Project name should not be empty'),
    body('description').not().isEmpty().withMessage('Project description should not be empty'),
    body('authorName').not().isEmpty().withMessage('Project author name should not be empty'),
    ];
    
}

module.exports.labelValidators = function(){
    return [
        body('name').isLength({min:3}).withMessage('Label length should be minimum of 3 words')
    ];
}

module.exports.issueValidators = function(){
    
    return [
        body('name').not().isEmpty().withMessage('Issue name should not be empty'),
        body('description').not().isEmpty().withMessage('Issue description should not be empty'),
        body('authorName').not().isEmpty().withMessage('Issue author name should not be empty'),
        body('labels').isArray({ min: 1 }).withMessage('Issue label should not be empty. If no label is available please create one by typing one and clicing on Add label'),
    ];
}   