'use strict';
const relay = require('graphql-relay');
const data = require('../data');

const typesMap = {};

module.exports = relay.nodeDefinitions(
    (globalId) => {
        const parsedId = relay.fromGlobalId(globalId);
        if (data[parsedId.type]) {
            return data[parsedId.type].findById(parsedId.id);
        } else {
            return null;
        }
    },

    (obj) => {
        for (let type in data) {
            const Model = data[type];
            if (obj instanceof Model && typesMap[type]) {
                return typesMap[type];
            }
        }

        return null;
    }
);

module.exports.addType = function (name, Type) {
    typesMap[name] = Type;
};
