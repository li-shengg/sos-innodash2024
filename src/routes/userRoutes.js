// routes.js
const express = require('express');
const router = express.Router();
const { Adduser } = require('../controllers/usercontrollers');

router.get('/add', Adduser);

module.exports = router;
