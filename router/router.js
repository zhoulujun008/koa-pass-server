let api = require('./api');
let admin = require('./admin');
let login = require('./login');
const koaJwt = require('koa-jwt');
const Const = require('../const');
const cors = require('koa2-cors');
module.exports = (app) => {
    app.use(login.routes());
    //这是处理前端跨域的配置
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
    )).use(api.routes());
    app.use(koaJwt({
        secret: Const.TokenGlobal
    }).unless({ // 配置白名单
        method: 'get',
        path: [
            /\/api\/img/
        ]
    })).use(admin.routes());
}
