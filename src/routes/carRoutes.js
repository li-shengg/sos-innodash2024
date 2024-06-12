// routes.js
const express = require('express');
const router = express.Router();
const { getCars } = require('../controllers/carcontrollers');

router.get('/getall', getCars);

module.exports = router;
