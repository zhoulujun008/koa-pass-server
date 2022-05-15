const Router = require('koa-router')
const newsRouter = new Router({
  prefix: '/web' //前缀
})
const productController = require('../controller/product')
const exampleController = require('../controller/example')
const serviceController = require('../controller/service')
const imgController = require('../controller/img')


newsRouter.get('/products', productController.getList)
newsRouter.get('/product/:id', productController.get)


newsRouter.get('/examples', exampleController.getList)
newsRouter.get('/examples/recommend', exampleController.getRecommendList)
newsRouter.get('/example/:id', exampleController.get)

newsRouter.post('/service', serviceController.add)
newsRouter.get('/img/:id', imgController.get)
module.exports  = newsRouter
