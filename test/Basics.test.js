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
    app.models.foo.destroy({}).exec((err,_)=>{
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
      })
    });
  });

  it('should softDelete an element', (done) => {
    app.models.foo.destroy({}).exec((err,_)=>{
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
      })
    });
  });

  it('should find only active records', (done) => {
    app.models.foo.destroy({}).exec((err,_)=>{
      app.models.foo.create({id:100}).exec((_, fooCreated) => {
        app.models.foo.create({id:101}).exec((_, fooCreated2) => {
          app.models.foo.softDelete({id:100}).exec((_,thing) => {
            app.models.foo.findActive({}).exec((_, fooFound) => {
              if(fooFound.length != 1){
                return done(new Error('More elements found'));
              }
              if(fooCreated2.id !== fooFound[0].id){
                return done(new Error('Element not found'));
              }
              if (fooFound[0].deletedAt != null){
                return done(new Error("Element deleted"));
              }
              done();
            })
          })
        })
      })
    });
  });

  it('should find only inactive records', (done) => {
    app.models.foo.destroy({}).exec((err,_)=>{
      app.models.foo.create({id:200}).exec((_, fooCreated) => {
        app.models.foo.create({id:201}).exec((_, fooCreated2) => {
          app.models.foo.softDelete({id:200}).exec((_,thing) => {
            app.models.foo.findInactive({}).exec((_, fooFound) => {
              if(fooFound.length != 1){
                return done(new Error('More elements found'));
              }
              if(fooCreated.id !== fooFound[0].id){
                return done(new Error('Element not found'));
              }
              if (fooFound[0].deletedAt == null){
                return done(new Error("Element not deleted"));
              }
              done();
            })
          })
        })
      })
    });
  });

});
