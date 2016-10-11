'use strict';
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

        return User.find({ email: email })
            .then(function (user) {
                if (!user) {
                    return false;
                }

                return user.comparePassword(password)
                    .then(function (isValid) {
                        if (isValid) {
                            req.session.user = {
                                id: user.id,
                            };
                            const url = req.query.return || '/';
                            res.redirect(baseUrl + url);
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
