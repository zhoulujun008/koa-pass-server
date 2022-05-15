const mysql = require('../mysql');

module.exports = {
  async getList(ctx) {
    try {
      const limit = ctx.query?.limit
      const keyword = ctx.query?.keyword
      let sql = `select id, name, description, serial, img
                 from product;`
      if(keyword){
        sql = `select id, name, description, serial, img from product where name like '%${keyword}%' and serial like '%${keyword}%';`
      }
      if(limit){
        sql = `select id, name, description, serial, img
               from product limit 0,${Number(limit)} ;`
      }
      const data = await mysql.query(sql)
      ctx.body = {
        'result': true,
        'data': data,
        'message': 'ok'
      }
    } catch (e) {
      ctx.body = {
        'result': false,
        'data': e,
        'message': 'ok'
      }
    }
  },
  async get(ctx) {
    try {
      const id = ctx.params.id
      const sql = `select name, description, serial, img
                   from product
                   where id = ${id};`
      const data = await mysql.query(sql)
      if (Array.isArray(data) && data.length === 1) {
        ctx.body = {
          'result': true,
          'data': data[0],
          'message': 'ok'
        }
      } else {
        ctx.body = {
          'result': false,
          'data': {},
          'message': '查找不到产品'
        }
      }

    } catch (e) {
      ctx.body = {
        'result': false,
        'data': e,
        'message': 'ok'
      }
    }
  },
  async add(ctx) {
    const { name, description, serial, img } = ctx.request.body
    const create_time = new Date().getTime()
    sql = `insert into product(name, description, serial, img)
             value('${name}','${description}','${serial}','${img}');`
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },
  async update(ctx) {
    const id = ctx.params.id
    const { name, description, serial, img } = ctx.request.body
    const sql = `update product
                 set name='${name}',
                     description='${description}',
                     serial='${serial}',
                     img='${img}'
                 where id = '${id}';`
    console.log(sql)
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },
  async delete(ctx) {
    const id = ctx.params.id
    sql = `delete
           from product
           where id = ${id};`
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },

}
