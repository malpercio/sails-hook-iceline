var Sails = require('sails').Sails;

module.exports = () => {
  let app = new Sails();
  before(function setup(done){
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

  return app;
}
