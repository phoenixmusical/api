'use strict';

module.exports = function (req, res, next) {
    const user = req.session.user;
    res.json({
        user: req.session.user || null,
    });
};
