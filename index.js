'use strict';

var extend = require("lodash/assignIn");

var methods = [
  {
    name: 'softDelete',
    fx : require('./src/softDelete')
  }
];

var attributes = [{
          deletedAt: {
              type: 'bigint',
              defaultsTo: null,
              isDate: true
          }
}];

function insertAttributes(models){
  let model,
    attrib;
  for(model of models){
    if (!model.attributes.deletedAt) {
      for(atrib of attributes){
        extend(model.attributes, attrib);
      }
    }
  }
}

function insertMethods(models){
  let model,
    method;
  for(model of models){
    if (!model.globalId) {
      for(method of methods){
        extend(model[method.name], method.fx(model));
      }
    }
  }
}

module.exports = (sails) => {
  return {
    initialize: (sails) => {
      let standBy = [],
        models = sails.models;
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
