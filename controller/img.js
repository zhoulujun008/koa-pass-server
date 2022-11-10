const path = require('path');
const Const = require('../const/index')
const uploadUrl = Const.uploadUrl
module.exports = {
  async add(ctx) {
    try {
      const file = ctx.request.files.file;
      const fileName = file.newFilename
      console.log(fileName)
      ctx.body = {
        data:{
          name:fileName,
          path:uploadUrl,
          // file
        },
        result: true,
        code: 0,
        message: '上传成功'
      };
      // 读取文件流
      /*const fileReader = fs.createReadStream(file.path);

      const filePath = path.join(__dirname, '/public/upload/');
      // 组装成绝对路径
      const fileResource = filePath + `/${file.name}`;


      /!*
       使用 createWriteStream 写入数据，然后使用管道流pipe拼接
      *!/
      const writeStream = fs.createWriteStream(fileResource);
      // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
      if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, (err) => {
          if (err) {
            throw new Error(err);
          } else {
            fileReader.pipe(writeStream);
            ctx.body = {
              url: uploadUrl + `/${file.name}`,
              code: 0,
              message: '上传成功'
            };
          }
        });
      } else {
        fileReader.pipe(writeStream);
        ctx.body = {
          url: uploadUrl + `/${file.name}`,
          code: 0,
          message: '上传成功'
        };
      }*/


      /* const file = ctx.request.files.upload_file
       // const fileName = `${new Date().getTime()}`+ file.name
       const fileName = file.name
       ctx.body = {
         'result': true,
         'data': `public/upload/${fileName}`,
         'message': JSON.stringify(e)
       }
       // 接收读出流
       const reader = fs.createReadStream(file.path)

       // 创建写入流
       // 3. 指定图片路径文件名（即上传图片存储目录）
       const stream = fs.createWriteStream(path.join('public/upload',fileName))
       // 用管道将读出流 "倒给" 输入流
       reader.pipe(stream)
       // 4.打印上传文件在服器上存储的相对路径
       console.log('uploading %s -> %s', file.name, stream.path)
       // 5.重定向到基于根目录下的静态资源web访问路径，展示图片
       ctx.redirect(stream.path.substr(6).replace(/\\/g,'/'))*/


     /* const file = ctx.request.files.file;
      const basename = path.basename(file.path); //这时拿到的 localhost:端口号/uploads/ 文件名
      //但是不可能把这串地址写死进去, 因为部署到服务器要添加域名
      //用灵活变量代表
      ctx.body = { url: `${ctx.origin}/uploads/${basename}` } //ctx.origin 就是 localhost:端口号*/


    }catch (e){
      ctx.body = {
        'result': false,
        'data': e,
        'message':'文件上传失败'
      }
    }


  },
  async get(ctx) {
    ctx.body = {
      'result': true,
      'data': 'test',
      'message': 'img'
    }
    // const file = ctx.request.files.file;
    // const basename = path.basename(file.path); //这时拿到的 localhost:端口号/uploads/ 文件名
    // //但是不可能把这串地址写死进去, 因为部署到服务器要添加域名
    // //用灵活变量代表
    // ctx.body = { url: `${ctx.origin}/uploads/${basename}` } //ctx.origin 就是 localhost:端口号
  },
  async del(ctx) {
    ctx.body = {
      'result': true,
      'data': 'test',
      'message': '用户活密码不正确，无法登录'
    }
    // const file = ctx.request.files.file;
    // const basename = path.basename(file.path); //这时拿到的 localhost:端口号/uploads/ 文件名
    // //但是不可能把这串地址写死进去, 因为部署到服务器要添加域名
    // //用灵活变量代表
    // ctx.body = { url: `${ctx.origin}/uploads/${basename}` } //ctx.origin 就是 localhost:端口号
  }



}
