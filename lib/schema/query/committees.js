'use strict';
const graphql = require('graphql');
const CommitteeType = require('../types/Committee');
const Committee = require('../data').Committee;

module.exports = {
    type: new graphql.GraphQLList(CommitteeType.Committee),
    resolve: () => Committee.findAll(),
};
