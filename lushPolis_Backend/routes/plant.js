const express = require('express');
const {getPlant, searchPlant, fetchcareGuidedetails, fetchFAQ, getHealth} = require('../controllers/plantcontroller');

const router = express.Router();

// router.get('/',getPlants);

router.post('/identification', getPlant);

router.get('/search/:plantName', searchPlant);

router.get('/careguide/:plantName',fetchcareGuidedetails);

router.get('/faq/:plantName',fetchFAQ);

router.post('/health',getHealth);

module.exports = router;