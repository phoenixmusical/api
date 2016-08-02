'use strict';
const session = require('express-session');

module.exports = session({
    name: 'phoenixmusical',
    secret: '42v#jEj6K bpT3,q#F"29,%f5(33y9^Q',
    resave: false,
    saveUninitialized: false,
});
