var plain = require("lodash/isPlainObject");
var {dtoi, itod, getDateFields} = require('./lib/dates');
var Query = require('./Query');



module.exports = (model) => {
  let attrib,
    instance,
    dates = getDateFields(model),
    now = Date.now();
  return (criteria) => {
    return new Query(
      () => {
        let deletedAt = {deletedAt: now};
        for(attrib in dates){
          if(criteria[attrib]){
            criteria[attrib] = dtoi(criteria[attrib]);
          }
        }
        return model.update(criteria, deletedAt);
      },
      (start, cb) => {
        return start().exec((err, instances) => {
          if(!err){
            for(instance of instances){
              for(attrib in dates){
                instance[attrib] = itod(instance[attrib]);
              }
            }
          }
          if(cb){
            return cb(err, instances);
          }
          return {exec: (callback) => {return callback(err,instances);}}
        });
      }
    );
  };
}
