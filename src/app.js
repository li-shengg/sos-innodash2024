// server.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/mainRoutes');
const bodyParser=require('body-parser')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use('/api', userRoutes);

app.use('/', express.static('public'))

//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app
