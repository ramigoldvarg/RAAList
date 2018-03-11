const routes = require('express').Router();
const pages = require('./pages/pages.js');

// Adds pages to the api
routes.use('/pages', pages);

module.exports = routes;