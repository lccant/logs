
const mongoose = require('mongoose');
const cfg = require('../config/index').sys.mongodb

// var dbpath = `mongodb://${cfg.user}:${cfg.passwd}@${cfg.host}:${cfg.port}/${cfg.database}`;
const dbpath = `mongodb://${cfg.host}:${cfg.port}/${cfg.database}`;
mongoose.connect(dbpath,{},function(err){
  if(err){
    console.log(`connect to server [${cfg.host}] error: `, err.message);
    process.exit(1);
  }
})


require('./log_behavior');
require('./log_error');
require('./log_system');
require('./log_warning');


module.exports = {
  LogBehavior :  mongoose.model('log_behavior'),
  LogError    :  mongoose.model('log_error'),
  LogSystem   :  mongoose.model('log_system'),
  LogWarning  :  mongoose.model('log_warning')
}