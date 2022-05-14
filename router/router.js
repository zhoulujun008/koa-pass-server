let api = require("./api");
module.exports = (app)=>{
  app.use(api.routes())
}
