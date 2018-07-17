/**
 * 错误日志对象
 */
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
let LogError = new Schema({
    service_name: {type: String, required: true},
    message: {type: String},
    stack: {type: String},
    created: {type: String}
});

LogError.index({service_name:1, created: -1});

mongoose.model('log_error',LogError);