const jwt = require('jsonwebtoken');
const Const = require('../const/index')
const serect = Const.TokenGlobal;  //密钥，不能丢
module.exports = (userinfo) => { //创建token并导出
  return jwt.sign({
    user: userinfo.user,
    id: userinfo.id
  }, serect, {expiresIn: '1h'});
};
