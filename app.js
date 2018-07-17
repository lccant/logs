const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const fs = require('fs');
const path = require('path');

const Seneca = require('seneca');
const seneca = Seneca();
const SenecaWeb = require('seneca-web');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

const senecaWebConfig = {
  context: index,
  adapter: require('seneca-web-adapter-koa2'),
  options: { parseBody: true}
}

seneca.use(SenecaWeb, senecaWebConfig);
//默认所有插件都在controllers文件夹下
const controllersDir = './controllers';
const paths = fs.readdirSync(controllersDir);
//装载seneca插件
paths.forEach(key=>{
    const fileName = path.basename(key, path.extname(key));
    const filePath = path.join(process.cwd(),controllersDir,key);
    seneca.use(require('./lib/pluginImporter')(filePath,fileName));
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = {app, seneca};
