'use strict';
const querystring = require('querystring');
const baseUrl = require('s-conf').get('baseUrl', '');
const User = require('../schema/data').User;

const errors = {
    EMAIL_MISSING: 'Le champs "Courriel" doit être remplis.',
    PASSWORD_MISSING: 'Le champs "Mot de passe" doit être remplis.',
    INVALID: 'Le courriel ou le mot de passe est invalide.',
};

module.exports = function (req, res, next) {
    function render(data) {
        res.render('login', data);
    }

    if (req.body) {
        const email = req.body.email;
        const password = req.body.password;
        if (!email) {
            return render({
                email: '',
                errors: [errors.EMAIL_MISSING],
            });
        }

        if (!password) {
            return render({
                email: email,
                errors: [errors.PASSWORD_MISSING],
            });
        }

        User.find({ email: email })
            .then(function (user) {
                if (!user) {
                    return render({
                        email: email,
                        errors: [errors.INVALID],
                    });
                }

                return user.comparePassword(password)
                    .then(function (isValid) {
                        if (isValid) {
                            req.session.user = {
                                id: user.id,
                                mustChangePassword: Boolean(user.must_change_password),
                            };
                            const returnUrl = baseUrl + (req.query.return || '/');
                            if (user.must_change_password) {
                                res.redirect(baseUrl + '/change-password?' + querystring.encode({
                                    return: returnUrl,
                                }));
                            } else {
                                res.redirect(returnUrl);
                            }
                        } else {
                            render({
                                email: email,
                                errors: [errors.INVALID],
                            });
                        }
                    });
            })
            .catch(next);
    } else {
        render({
            email: '',
            errors: [],
        });
    }
};
