const Const = require('../const/index')

// 设置配置文件
const config = {
    // 启动端口
    port: Const.Port,
    // 数据库配置
    database: {
        DATABASE: '',
        USERNAME: '',
        PASSWORD: Const.PASSWORD,
        PORT: '3306',
        HOST: 'localhost'
    }
}
// UPDATE user SET Password = PASSWORD('zljHnj@8889') WHERE user = 'root';
module.exports = config
