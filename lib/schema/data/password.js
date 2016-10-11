'use strict';
const bcrypt = require('bcrypt-nodejs');

function createPromise(action) {
    return new Promise(function (resolve, reject) {
        action(function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.hash = function (password) {
    return createPromise(callback => bcrypt.hash(password, null, null, callback));
};

exports.compare = function (password, passwordHash) {
    if (!passwordHash) {
        return Promise.resolve(false);
    }

    return createPromise(callback => bcrypt.compare(password, passwordHash, callback));
};
