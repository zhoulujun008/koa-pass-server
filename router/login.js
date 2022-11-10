const Router = require('koa-router')
const newsRouter = new Router({
  prefix: '/user' //前缀
})
const apiController = require('../controller/api')
newsRouter.post('/login', apiController.login)
module.exports  = newsRouter
