const mysql = require('../mysql');
const addToken = require('../token/index');

module.exports = {
  async login(ctx) {
    let { user, password } = ctx.request.body
    if(!user||!password){
      return  ctx.body = {
        'result': false,
        'data': data,
        'message': '参数不合法'
      }
    }
    console.log(user, password)
    let sql = `select id, user
               from user
               where \`user\` = "${user}"
                 AND \`password\` = "${password}";`
    const data = await mysql.query(sql)
    console.log(data)
    if (data?.length===1) {
      const user = data[0]
      let token = addToken(user)  //token中要携带的信息，自己定义
      ctx.body = {
        'result': true,
        'data': {user,token},
        'message': 'ok'
      }
    }else {
      ctx.body = {
        'result': false,
        'data': data,
        'message': '用户活密码不正确，无法登录'
      }
    }


  },
}
