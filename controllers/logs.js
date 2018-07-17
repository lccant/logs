const BaseController = require('../lib/baseController');
const controller = new BaseController();

const { LogError, LogBehavior, LogSystem, LogWarning } = require('../models/index');

controller.writeError = async data => {
    try{    
        let { service_name='', message='', stack=''} = data;
        let log = await new LogError({
            service_name,
            message,
            stack
        }).save();
        console.log('--Error is done!')
    }catch(e){
        console.log(e);
    }
}

controller.writeBehavior = async data => {
    try{    
        let { service_name='', user_name='', message=''} = data;
        let log = await new LogBehavior({
            service_name,
            user_name,
            message
        }).save();
        console.log('--Behavior is done!')
    }catch(e){
        console.log(e);
    }
}

controller.writeSystem = async data => {
    try{    
        let { service_name='', message=''} = data;
        let log = await new LogSystem({
            service_name,
            message
        }).save();
        console.log('--System is done!')
    }catch(e){
        console.log(e);
    }
}

controller.writeWarning = async data => {
    try{    
        let { service_name='', message=''} = data;
        let log = await new LogWarning({
            service_name,
            message
        }).save();
        console.log('--Warning is done!')
    }catch(e){
        console.log(e);
    }
}




exports = module.exports = controller;