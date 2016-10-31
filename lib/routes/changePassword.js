'use strict';
const baseUrl = require('s-conf').get('baseUrl', '');
const User = require('../schema/data').User;

const labels = {
    oldPassword: 'Ancien mot de passe',
    password: 'Nouveau mot de passe',
    passwordRepeat: 'Nouveau mot de passe (répéter)',
};

const errors = {
    FIELD_MISSING: 'Tous les champs doivent être remplis.',
    INVALID_PASSWORD: "L'ancien mot de passe est invalide.",
    PASSWORD_MISMATCH: `Le champs "${labels.password}" et le champs "${labels.passwordRepeat}" ne correspondent pas.`,
};

module.exports = function (req, res, next) {
    function render(errors) {
        res.render('changePassword', {
            labels: labels,
            errors: errors || [],
        });
    }

    const body = req.body;
    const session = req.session;
    if (!session.user) {
        res.redirect(baseUrl + '/login');
    } else if (!body) {
        render();
    } else {
        if (!body.oldPassword || !body.password || !body.passwordRepeat) {
            return render([errors.FIELD_MISSING]);
        }

        if (body.password !== body.passwordRepeat) {
            return render([errors.PASSWORD_MISMATCH]);
        }

        User.findById(req.session.user.id)
            .then(function (user) {
                if (!user) {
                    throw new Error('User not found in the DB');
                }

                return user.comparePassword(body.oldPassword)
                    .then(function (isValid) {
                        if (!isValid) {
                            return render([errors.INVALID_PASSWORD]);
                        }

                        user.must_change_password = 0;
                        return user.setPassword(body.password);
                    });
            })
            .then(function () {
                session.user.mustChangePassword = false;
                const returnUrl = req.query.return || (baseUrl + '/');
                res.redirect(returnUrl);
            })
            .catch(next);
    }
};
