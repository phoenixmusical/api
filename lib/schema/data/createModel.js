'use strict';
const db = require('../../db');

module.exports = function (tableName, Model) {
    Model.tableName = tableName;

    Model.findById = function (id) {
        return db(tableName)
            .where({ id: id })
            .first()
            .then(row => new Model(row));
    };

    Model.find = function (conditions) {
        return db(tableName)
            .where(conditions || {})
            .first()
            .then(row => new Model(row));
    };

    Model.findAll = function (conditions) {
        return db(tableName)
            .where(conditions || {})
            .select()
            .then(rows => rows.map(row => new Model(row)));
    };

    return Model;
};
