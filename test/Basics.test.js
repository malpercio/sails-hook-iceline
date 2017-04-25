var each = require("lodash/forEach");
var app = require('./bootstrap')();

describe('Basic tests', function (){

  it('should start', (done) => {
    done();
  });

  it('should load iceline', (done) => {
    if(app.hooks.iceline){
      return done();
    }
    done(new Error("Iceline not found"));
  });

});


describe('Soft Delete', function (){

  it('should add DeletedAt attribute on every model', (done ) => {
    each(app.models, (model) => {
      if(!model.attributes.deletedAt){
        return done(new Error("deletedAt not found"));
      }
      done();
    });
  });

  it('should add softDelete method on every model', (done ) => {
    each(app.models, (model) => {
      if(!model.softDelete){
        return done(new Error("softDelete not found"));
      }
      done();
    });
  });
});
