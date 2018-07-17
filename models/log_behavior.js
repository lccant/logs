/**
 * 行为日志对象
 */
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
let LogBehavior = new Schema({
    service_name: {type: String, required: true},
    user_name: {type: String},
    message: {type: String},
    created: {type: String}
});

LogBehavior.index({service_name:1, created: -1});


mongoose.model('log_behavior',LogBehavior);