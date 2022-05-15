// index.js
const Koa = require('koa')
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt');

const config = require('./config/defualt')


const router = require('./router/router-web');
const Const = require('./const/index');
const fs = require('fs');

let app = new Koa();
//这是处理前端跨域的配置
app.use(cors(
  {
    /* origin: function (ctx) {
       // if (ctx.url === '/login') {
       //   return "*"; // 允许来自所有域名请求
       // }
       return '*';
     },*/
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }
));
app.use(koaJwt({
  secret: Const.TokenGlobal
}).unless({ // 配置白名单
  method: 'get',
  path: [
    /\/api\/login/,
    /\/api\/img/
  ]
}))

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
})

router(app);


if (Const.dev === 'product') {
  const https = require('https')
  const sslify = require('koa-sslify').default
  app.use(sslify())
  const options = {
    key: fs.readFileSync(__dirname + '/ssl/www.zhoulujun.co.key'),
    cert: fs.readFileSync(__dirname + '/ssl/www.zhoulujun.co_bundle.pem'),
  }
  https.createServer(options, app.callback()).listen(config.port, (err) => {
    if (err) {
      console.log('服务启动出错', err);
    } else {
      // db.connect();  // 数据库连接
      console.log('guessWord-server运行在' + config.port + '端口');
    }
  });
} else {
  app.listen(config.port)
}


//

console.log(`listening on port ${config.port}`)
