const mysql = require('../mysql');

module.exports = {
  async getList(ctx) {
    try {
      const sql = `select id, name, description, serial, img
                   from example;`
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
  async getRecommendList(ctx) {
    try {
      const recommend = ctx.query?.recommend || 0
      const sql = `select id, name, description, serial, img
                   from example
                   where recommend = ${Number(recommend)};`
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
                   from example
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
    const { name, description, serial, img, recommend } = ctx.request.body
    const create_time = new Date().getTime()
    sql = `insert into example(name, description, serial, img, recommend, create_time)
             value('${name}','${description}','${serial}','${img}','${create_time}');`
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },
  async update(ctx) {
    const id = ctx.params.id
    const { name, description, serial, img, recommend } = ctx.request.body
    const sql = `update example
                 set name='${name}',
                     description='${description}',
                     serial='${serial}',
                     img='${img}',
                     recommend='${recommend}'
                 where id = '${id}';`

    // const { name, description, serial, img, recommend } = ctx.request.body
    // const sql = `update example
    //              set name='${name}',
    //                  description='${description}',
    //                  serial='${serial}',
    //                  img='${img}',
    //                  recommend=`${recommend}`
    //              where id = '${id}';`
    console.log(sql)
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },
  async delete(ctx) {
    const id = ctx.params.id
    sql = `delete
           from example
           where id = ${id};`
    const data = await mysql.query(sql)
    ctx.body = {
      'result': true,
      'data': data,
      'message': 'ok'
    }
  },

}
