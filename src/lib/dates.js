var each = require("lodash/forEach");

module.exports = {
  dtoi:(date) => {
    return date.getTime();
  },
  itod:(bigint) => {
    return new Date(bigint);
  },
  getDateFields:(model) => {
    let fields = [];
    each(model.attributes, (attrib) =>{
      if(attrib.isDate){
        fields.push(attrib);
      }
    });
    return fields;
  }
}
