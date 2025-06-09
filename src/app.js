const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/v1', routes);

module.exports = app;
