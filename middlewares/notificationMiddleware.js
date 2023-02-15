module.exports.setFlash = function(req,res,next){
    // res.locals.flash = {
    //     'success':req.flash('success'),
    //     'error':req.flash('error')
    // } 
    res.locals.alerts = req.flash();
    next();
}