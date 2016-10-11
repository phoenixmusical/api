'use strict';
const inquirer = require('inquirer');
const User = require('../lib/schema/data').User;

User.findAll()
    .then(users =>
        inquirer.prompt([
            {
                type: 'list',
                name: 'user',
                message: 'User:',
                choices: users.map(user => ({
                    name: user.email,
                    value: user,
                })),
                validate: function (user) {
                    if (user) {
                        return true;
                    } else {
                        return 'User not found';
                    }
                },
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:',
                validate: function (password) {
                    if (password) {
                        return true;
                    } else {
                        return 'Empty password is not allowed';
                    }
                },
            },
        ])
    )
    .then(results => results.user.setPassword(results.password))
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error(error.message || error);
        process.exit(0);
    });
