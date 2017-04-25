var plain = require("lodash/isPlainObject");
var {dtoi, itod, _} = require('./lib/dates')
module.export = (model) => {
  return (criteria, cb) => {
    let attrib,
      instance,
      dates = getDateFields(),
      now = Date.now();
    let deletedAt = {deletedAt: now};
    for(attrib in dates){
      criteria[attrib] = dtoi(criteria[attrib]);
    }
    return model.update(criteria, deletedAt).exec((err, instances, cb) => {
      if(!err){
        for(instance of instances){
          for(attrib in dates){
            instance[attrib] = itod(instance[attrib]);
          }
        }
      }
      return cb(err, instances);
    });
  };
}
