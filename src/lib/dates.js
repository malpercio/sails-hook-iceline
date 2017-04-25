module.exports = {
  dtoi:(date) => {
    return date.getTime();
  },
  itod:(bigint) => {
    return new Date(bigint);
  },
  getDateFields:(model) => {
    let attrib,
      fields;
    for(attrib of model.attributes){
      if(attrib.isDate){
        fields.push(attrib);
      }
    }
    return fields;
  }
}
