var plain = require("lodash/isPlainObject");

module.exports = (model) => {
  let attrib,
    instance;
  return (criteria, cb) => {
    let deletedAt = {deletedAt: Date.now()};
    return model.update(criteria, deletedAt, cb);
  };
}
