const Router = require('koa-router')
const newsRouter = new Router({
  prefix: '/api' //前缀
})
const productController = require('../controller/product')
const exampleController = require('../controller/example')
const serviceController = require('../controller/service')
const imgController = require('../controller/img')




newsRouter.get('/products', productController.getList)
newsRouter.get('/product/:id', productController.get)
newsRouter.post('/product', productController.add)
newsRouter.put('/product/:id', productController.update)
newsRouter.del('/product/:id', productController.delete)

newsRouter.get('/examples', exampleController.getList)
newsRouter.get('/examples/recommend', exampleController.getRecommendList)
newsRouter.get('/example/:id', exampleController.get)
newsRouter.post('/example', exampleController.add)
newsRouter.put('/example/:id', exampleController.update)
newsRouter.del('/example/:id', exampleController.delete)

newsRouter.get('/services', serviceController.getList)
newsRouter.get('/service/:id', serviceController.get)
newsRouter.post('/service', serviceController.add)
newsRouter.put('/service/:id', serviceController.update)
newsRouter.del('/service/:id', serviceController.delete)

newsRouter.post('/img', imgController.add)
newsRouter.del('/img/:id', imgController.del)
newsRouter.get('/img/:id', imgController.get)
module.exports  = newsRouter
