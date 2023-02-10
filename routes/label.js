const express = require('express');
const router = express.Router();

const label = require('../controllers/labelcontroller/label');

router.get('/all-labels', label.showlabels);

router.post('/create-label',label.createLabel);

router.get('/delete-label/:id',label.deleteLabel);

router.post('/get-suggestions',label.getSuggestions);

router.get('/get-label-values/:id',label.getLabelValues);

module.exports = router;
