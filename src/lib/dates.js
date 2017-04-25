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
        fields.add(attrib);
      }
    }
    return fields;
  }
}
