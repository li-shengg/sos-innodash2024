// routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/carcontrollers');




router.get('/selecttodaycars',controller.selecttodaycars);
router.get('/selectallcars',controller.selectallcars);
router.get('/getcar',controller.getcar);
router.post('/addcar', controller.addcar);
router.put('/updatepaymentstatus',controller.updatepaymentstatus);

module.exports = router;
