var Sails = require('sails').Sails;

module.exports = () => {
  let app = new Sails();
  before((done) => {
    app.load({
      globals: false,
      log: { level: 'warn' },
      hooks: {
        orm: require('sails-hook-orm'),
        iceline: require('..')
      },
      loadHooks: ['moduleloader', 'userconfig', 'orm', 'iceline'],
      models: {
        migrate: 'safe'
      },
      datastores: {
        default: {
          url: 'http://foo.com/'
        }
      },
      orm: {

        moduleDefinitions: {
          models: {
            foo: {
              primaryKey: 'id',
              attributes: {
                id: {
                  type: 'number',
                  required: true
                }
              }
            }
          }
        }
      }
    },done);
  });

  after((done) => {
    app.models.foo.destroy({}).exec(() =>{
      app.lower(done);
    });
  });

  return app;
}
