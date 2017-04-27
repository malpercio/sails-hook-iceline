'use strict';

var extend = require("lodash/assignIn");
var each = require("lodash/forEach");

var methods = [
  ['softDelete', {softDelete: require('./src/softDelete')}],
  ['findActive', {findActive: require('./src/findActive')}],
  ['findInactive', {findInactive: require('./src/findInactive')}]
];

function insertMethods(models){
  let model,
    method;
  each(models, (model) => {
    for(method of methods){
      let object = {};
      object[method[0]] = method[1][method[0]](model);
      extend(model, object);
    }
  });
}


module.exports = (sails) => {

  return {
    initialize: (done) => {
      let standBy = ['hook:moduleloader:loaded'];
      (sails.hooks.orm)?standBy.push('hook:orm:loaded'):undefined;
      (sails.hooks.pubsub)?standBy.push('hook:pubsub:loaded'):undefined;

      sails.after(standBy, () => {
        insertMethods(sails.models);
        done();
      });

    }
  };
};
