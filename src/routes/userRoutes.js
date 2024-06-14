// routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usercontrollers');

router.get('/getusername',controller.getusername);

module.exports = router;
