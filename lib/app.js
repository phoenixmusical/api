'use strict';
const path = require('path');
const express = require('express');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = module.exports = express();

app.engine('ejs', ejsMate);
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(require('./session'));
app.use('/graphql', require('./graphql'));

app.get('/login', require('./routes/login'));
app.post('/login', bodyParser.urlencoded({ extended: false }), require('./routes/login'));
app.get('/logout', require('./routes/logout'));
app.get('/auth', require('./routes/auth'));
app.get('/scraper', require('./routes/scraper'));
