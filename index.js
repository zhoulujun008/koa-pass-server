// index.js
const Koa = require('koa')
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');
const path = require('path')


const router = require('./router/router');
const Const = require('./const/index');
const fs = require('fs');



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
    maxFieldsSize: 1000 * 1024 * 1024,
    /* onFileBegin:(name,file) => { // 文件上传前的设置
       // console.log(`name: ${name}`);
       // console.log(file);
     },*/
  }
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
  const options = {
    key: fs.readFileSync(__dirname + '/ssl/www.sekocnc.cn.key'),
    cert: fs.readFileSync(__dirname + '/ssl/www.sekocnc.cn_bundle.pem'),
  }
  const http2 = require('http2');
  http2.createSecureServer(options, app.callback()).listen(3000);
  // const https = require('https')
  // const sslify = require('koa-sslify').default
  // app.use(sslify())
  // const options = {
  //   key: fs.readFileSync(__dirname + '/ssl/www.sekocnc.cn.key'),
  //   cert: fs.readFileSync(__dirname + '/ssl/www.sekocnc.cn_bundle.pem'),
  // }
  // https.createServer(options, app.callback()).listen(Const.Port, (err) => {
  //   if (err) {
  //     console.log('服务启动出错', err);
  //   } else {
  //     // db.connect();  // 数据库连接
  //     console.log('guessWord-server运行在' + Const.Port + '端口');
  //   }
  // });
} else {
  app.listen(Const.Port)
}

//

console.log(`listening on port ${Const.Port}`)
