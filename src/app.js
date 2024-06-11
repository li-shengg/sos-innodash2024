// server.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/mainRoutes');

app.use(express.json());
app.use('/api', userRoutes);

app.use('/', express.static('public'))

//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app
