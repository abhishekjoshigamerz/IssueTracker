const express = require('express');
const homeController = require('../controllers/home/homecontroller');

const router = express.Router();


router.get('/',homeController.home);

router.use('/project',require('./projects'));
router.use('/issue',require('./issues'));
router.use('/labels',require('./label'));
module.exports = router;