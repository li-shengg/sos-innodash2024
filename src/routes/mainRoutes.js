// routes.js
const express = require('express');
const router = express.Router();
const { getCars } = require('../controllers/controllers.js');

router.get('/cars', getCars);

module.exports = router;
