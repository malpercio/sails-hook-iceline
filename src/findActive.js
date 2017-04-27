var plain = require("lodash/isPlainObject");

module.exports = (model) => {
  return (criteria, cb) =>{
    if(!criteria){
      criteria = {};
    }
    criteria.deletedAt = null;
    return model.find(criteria, cb);
  }

}
