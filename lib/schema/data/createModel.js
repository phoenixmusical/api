'use strict';
const db = require('../../db');

module.exports = function (tableName, BaseModel) {
    class Model extends BaseModel {
        save () {
            return db(tableName)
                .where({ id: this.id })
                .update(this)
                .then(() => this);
        }
    }

    Model.tableName = tableName;

    function instanciateModel(data) {
        if (data) {
            return new Model(data);
        } else {
            return null;
        }
    }

    Model.findById = function (id) {
        return db(tableName)
            .where({ id: id })
            .first()
            .then(instanciateModel);
    };

    Model.find = function (conditions) {
        return db(tableName)
            .where(conditions || {})
            .first()
            .then(instanciateModel);
    };

    Model.findAll = function (conditions) {
        return db(tableName)
            .where(conditions || {})
            .select()
            .then(rows => rows.map(instanciateModel));
    };

    return Model;
};
