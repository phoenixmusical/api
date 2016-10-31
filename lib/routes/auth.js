'use strict';

module.exports = function (req, res, next) {
    const user = req.session.user;
    if (user && !user.mustChangePassword) {
        res.status(200);
        res.end('Authorized');
    } else {
        res.status(401);
        res.end('Login required');
    }
};
