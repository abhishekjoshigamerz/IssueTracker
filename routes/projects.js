const express = require('express');
const projectcontroller = require('../controllers/projectcontroller/projectcontroller');
const router = express.Router();

router.get('/add-project',projectcontroller.addproject);

router.post('/create-project',projectcontroller.createproject);

router.get('/view-project/:id',projectcontroller.viewproject);

module.exports = router;