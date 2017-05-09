/**
 * Created by cbravo on 6/4/17.
 */

var config = require('./../config');
var helper = require('./helpers');

var Action = function(){};

Action.prototype.greeting = function () {
  return config.recomendations[helper.getRandomInt(0,13)];
};

module.exports = new Action();