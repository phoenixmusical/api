'use strict';
const express = require('express');

const app = module.exports = express();

app.use(require('./session'));
app.use('/graphql', require('./graphql'));
