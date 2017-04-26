class Query{
  constructor(start, exec){
    this.start = start;
    this.execute = exec;
  }

  exec(cb){
    return this.execute(this.start, cb);
  }
}

module.exports = Query;
