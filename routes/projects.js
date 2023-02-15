const express = require('express');
const projectcontroller = require('../controllers/projectcontroller/projectcontroller');
const router = express.Router();
const validators  = require('../middlewares/validationChecker');
router.get('/get-all-projects/:page',projectcontroller.getAllProjects);

router.get('/add-project',  projectcontroller.addproject);

router.post('/create-project', validators.projectValidators() ,projectcontroller.createproject);


router.get('/view-project/:id',projectcontroller.viewproject);

module.exports = router;