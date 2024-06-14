// routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/carcontrollers');

router.get('/selectallcars',controller.selectallcars);
router.post('/addcar', controller.addcar,controller.selectallcars);
router.put('/updatewashstatus',controller.updatewashingstatus);
router.put('/updatepaymentstatus',controller.updatepaymentstatus);

module.exports = router;
