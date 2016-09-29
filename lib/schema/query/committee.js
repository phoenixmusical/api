'use strict';
const graphql = require('graphql');
const relay = require('graphql-relay');
const CommitteeType = require('../types/Committee');
const Committee = require('../data').Committee;

module.exports = {
    type: CommitteeType.Committee,
    args: {
        id: relay.globalIdField('Committee'),
    },
    resolve: function (parent, args) {
        const parsedId = relay.fromGlobalId(args.id);
        if (parsedId.type === 'Committee') {
            return Committee.findById(parsedId.id);
        } else {
            return null;
        }
    },
};
