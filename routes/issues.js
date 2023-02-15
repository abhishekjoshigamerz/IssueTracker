const express = require('express');
const router = express.Router();
const validators = require('../middlewares/validationChecker');
const issueController = require('../controllers/issuecontroller/issuecontroller');

router.get('/add-issue/:id',issueController.issueform);
router.post('/create-issue',validators.issueValidators(),issueController.createissue);


router.post('/filter-by-author',issueController.filterByAuthor);
router.post('/filter-by-title-and-description',issueController.filterByTitleAndDescription);

router.post('/filter-by-labels',issueController.filterByLabels);

module.exports = router;