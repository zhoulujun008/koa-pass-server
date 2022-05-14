let api = require("./admin");
module.exports = (app)=>{
  app.use(api.routes())
}
