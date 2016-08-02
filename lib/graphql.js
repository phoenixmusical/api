'use strict';
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = graphqlHTTP(req => ({
    schema: schema,
    context: req.session,
    graphiql: true,
    formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack,
    }),
}));
