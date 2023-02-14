const express = require('express');
const projectcontroller = require('../controllers/projectcontroller/projectcontroller');
const router = express.Router();

router.get('/get-all-projects/:page',projectcontroller.getAllProjects);

router.get('/add-project',projectcontroller.addproject);

router.get('/addFakeData',function(req,res){
    res.send('Running generating fake data');
});
router.post('/addFakeData',projectcontroller.addFakeData);


router.post('/create-project',projectcontroller.createproject);


router.get('/add-fake-data',projectcontroller.generateFakeData);

router.get('/view-project/:id',projectcontroller.viewproject);

module.exports = router;