/**
 * 系统日志对象
 */
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
let LogSystem = new Schema({
    service_name: {type: String, required: true},
    message: {type: String},
    created: {type: String}
});

LogSystem.index({service_name:1, created: -1});

mongoose.model('log_system',LogSystem);