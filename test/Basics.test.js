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

  it('should add DeletedAt attribute on every model', (done) => {
    each(app.models, (model) => {
      if(!model.attributes.deletedAt){
        return done(new Error("deletedAt not found"));
      }
      done();
    });
  });

  it('should add softDelete method on every model', (done) => {
    each(app.models, (model) => {
      if(!model.softDelete){
        return done(new Error("softDelete not found"));
      }
      done();
    });
  });

  it('should add an element and not delete it', (done) => {
    app.models.foo.create({id:0}).exec((_, fooCreated) => {
      app.models.foo.find({id:0}).exec((_, [fooFound]) => {
        if(fooCreated.id !== fooFound.id){
          return done(new Error('Element not found'));
        }
        if (fooFound.deletedAt != null){
          return done(new Error("Element deleted"));
        }
        done();
      })
    });
  });

  it('should softDelete an element', (done) => {
    app.models.foo.create({id:0}).exec((_, fooCreated) => {
      app.models.foo.softDelete({id:0}).exec((_,thing) => {
        app.models.foo.find({id:0}).exec((_, [fooFound]) => {
          if(fooCreated.id !== fooFound.id){
            return done(new Error('Element not found'));
          }
          if (fooFound.deletedAt == null){
            return done(new Error("Element not deleted"));
          }
          done();
        })
      })
    });
  });

});
