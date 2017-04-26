var plain = require("lodash/isPlainObject");
var {dtoi, itod, getDateFields} = require('./lib/dates');
var Query = require('./Query');



module.exports = (model) => {
  return (criteria) =>{
    criteria.deletedAt = null;
    return model.find(criteria);
  }

}
