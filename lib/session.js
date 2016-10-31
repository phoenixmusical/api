'use strict';
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const secret = require('s-conf').require('secret');
const db = require('./db');

const store = new KnexSessionStore({
    knex: db,
    createtable: false,
    tablename: 'sessions',
});

module.exports = session({
    name: 'phoenixmusical',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store,
});
