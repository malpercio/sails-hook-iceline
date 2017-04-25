'use strict';

var extend = require("lodash/assignIn");

var methods = [];

var attributes = [];

function insertAttributes(){

}

function insertMethods(){

}

module.exports = function (sails) {
  return {
    initialize: (sails) => {
      let standBy = [],
      let models = sails.models;
      sails.after(['hook:moduleloader:loaded'], () => {
        insertAttributes(models);
      });

      (sails.hook.orm)?standBy.add('hook:orm:loaded'):undefined;
      (sails.hook.pubsub)?standBy.add('hook:pubsub:loaded'):undefined;

      sails.after(standBy, () => {
        insertMethods(models);
        done();
      });
    }
  };
};
