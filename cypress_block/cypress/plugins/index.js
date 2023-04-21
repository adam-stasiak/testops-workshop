/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const webpack = require('@cypress/webpack-preprocessor')
const fakerPreprocessor = require('./faker-preprocessor');
module.exports = on => {
    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('../../webpack.config'),
        watchOptions: {}
    }
}
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
    initPlugin(on, config);
    return config;
};