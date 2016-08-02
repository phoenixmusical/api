'use strict';
const knex = require('knex');
const config = require('s-conf');

module.exports = knex(config.require('db'));
