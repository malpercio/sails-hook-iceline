'use strict';

var extend = require("lodash/assignIn");
var each = require("lodash/forEach");

var methods = [
  ['softDelete', {softDelete: require('./src/softDelete')}]
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
  each(models,(model) =>{
    if (!model.attributes.deletedAt) {
      for(attrib of attributes){
        extend(model.attributes, attrib);
      }
    }
  });
}

function insertMethods(models){
  let model,
    method;
  each(models, (model) => {
    if (!model.globalId) {
      for(method of methods){
        let object = {};
        object[method[0]] = method[1][method[0]](model);
        extend(model, object);
      }
    }
  });
}


module.exports = (sails) => {

  return {
    initialize: (done) => {
      let standBy = ['hook:moduleloader:loaded'],
        models = sails.models;
      (sails.hooks.orm)?standBy.push('hook:orm:loaded'):undefined;
      (sails.hooks.pubsub)?standBy.push('hook:pubsub:loaded'):undefined;

      sails.after(standBy, () => {
        insertAttributes(models)
        insertMethods(models);
        done();
      });

    }
  };
};
