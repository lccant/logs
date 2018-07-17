const amqp = require('amqp');
const rabbit_opts = require('../config/index').sys.rabbit;

const logs = require('../controllers/logs');

const connection = amqp.createConnection(rabbit_opts);

connection.on('error',function(e){
    console.log("Error from amqp: ", e);
})

connection.on('ready', function(){
    connection.queue('error', function(q){
        console.log('error-queue is already subscribing');
        q.bind('logs','error',function(){
            q.subscribe(function(message){
                logs.writeError(message);
            })
        });
    })

    connection.queue('warning', function(q){
        console.log('warning-queue is already subscribing');
        q.bind('logs','warning',function(){
            q.subscribe(function(message){
                logs.writeWarning(message);
            })
        });
    })

    connection.queue('system', function(q){
        console.log('system-queue is already subscribing');
        q.bind('logs','system',function(){
            q.subscribe(function(message){
                logs.writeSystem(message);
            })
        });
    })

    connection.queue('behavior', function(q){
        console.log('behavior-queue is already subscribing');
        q.bind('logs','behavior',function(){
            q.subscribe(function(message){
                logs.writeBehavior(message);
            })
        });
    })
})
