var debug = require('debug')('clite');
var path = require('path');

module.exports = (args) => {
  const root = typeof args === 'string' ? args : args.root;
  // do not run when running from inside of npm scripts
  if (process.env['npm_config_node_version']) { // jshint ignore:line
    return;
  }

  debug('checking for cli updates');
  var defaults = require('lodash.defaults');
  var pkg = require(path.resolve(root, 'package.json'));

  // finally, check for available update and returns an instance
  return require('update-notifier')({
    pkg: defaults(pkg, { version: '0.0.0' }),
  }).notify();
};