const express = require('express');
const router = express.Router();

const label = require('../controllers/labelcontroller/label');

router.get('/all-labels', label.showlabels);

module.exports = router;
