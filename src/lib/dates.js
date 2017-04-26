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
      if(attrib.type == "integer" && attrib.size == 64){
        fields.push(attrib);
      }
    });
    return fields;
  }
}
