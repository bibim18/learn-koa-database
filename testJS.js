const koa = require('koa');
const Route = require('koa-router');
const Sequelize = require('sequelize');
const bodyParser = require('koa-bodyparser')

const app = new koa()
const router = new Route()

app.use(bodyParser())
app.use(router.allowedMethods())
app.use(router.routes())



let users;

const sequelize = new Sequelize('it', 'root', '12345678', {
    dialect: 'mysql'
  })

//   sequelize.query("SELECT * FROM test", {type: Sequelize.QueryTypes.SELECT}).then(myTableRows => {
//     users = myTableRows;
//   })

 const test = sequelize.define('test', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fname: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    lname: {
      type: Sequelize.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'test',
    timestamp: false
  }) 

  const Op = Sequelize.Op;

//select * from test where id = 2
router.get('/test', async(ctx) => {
  let data = await test.findAll()
  ctx.body = data
})

//insert into test
router.post('/test', async(ctx) => {
  // console.log(ctx.request.body)
  const {fname, lname} = ctx.request.body
  console.log(fname, lname)
  let data = await test.create({ fname, lname })
  ctx.body = data
})



const port = 3001
app.listen(port, () => {
    console.log('running on port'+port)
}) 