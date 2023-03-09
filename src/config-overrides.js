const fallback = require('fallback-webpack-plugin');
const crypto = require('crypto-browserify');
const stream = require('stream-browserify');
const timers = require('timers-browserify');

module.exports = function override(config, env) {
  // Add fallback configuration
  config.resolve.fallback = {
    "crypto": crypto,
    "stream": stream,
    "timers": timers
  };

  // Add fallback plugin
  config.plugins.push(new fallback());

  return config;
};
