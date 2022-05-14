// index.js
const Koa = require('koa')
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt');

const config = require('./config/defualt')
const path = require('path')


const router = require('./router/router-admin');
const Const = require('./const/index');
const fs = require('fs');
const { default: sslify } = require('koa-sslify');
const https = require('https');


let app = new Koa();
app.use(views(__dirname + '/views'))
// 1.静态资源服务，指定对外提供访问的根目录，不包括 public
app.use(static(__dirname + '/public'));
// 使用文件上传中间件
app.use(koaBody({
  multipart: true,  //允许上传文件
  formidable: {
    //这是个 node 包, 设置一下选项
    uploadDir: path.join(__dirname, '/public/upload'), //设置上传目录
    keepExtensions: true,  //设置文件后缀名保留
    maxFieldsSize: 2 * 1024 * 1024,
    /* onFileBegin:(name,file) => { // 文件上传前的设置
       // console.log(`name: ${name}`);
       // console.log(file);
     },*/
  }
}))
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
    /\/api\/register/,
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


app.use(async (ctx) => {
  ctx.body = {
    'result': true,
    'data': 'hello',
    'message': 'ok'
  }
})


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
