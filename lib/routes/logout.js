'use strict';
const querystring = require('querystring');
const baseUrl = require('s-conf').get('baseUrl', '');

module.exports = function (req, res, next) {
    req.session.destroy();
    let url = '/login';
    if (req.query.return) {
        url += '?' + querystring.stringify({
            return: req.query.return,
        });
    }

    res.redirect(baseUrl + url);
};
