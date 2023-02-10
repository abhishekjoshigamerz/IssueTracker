const express = require('express');
const router = express.Router();

const issueController = require('../controllers/issuecontroller/issuecontroller');

router.get('/add-issue/:id',issueController.issueform);
router.post('/create-issue',issueController.createissue);
module.exports = router;