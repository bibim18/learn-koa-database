const koa = require('koa');
const Route = require('koa-router');
const Sequelize = require('sequelize');

const app = new koa()
const router = new Route()

let users;

const sequelize = new Sequelize('it', 'root', '12345678', {
    dialect: 'mysql'
  })

  sequelize.query("SELECT * FROM test", {type: Sequelize.QueryTypes.SELECT}).then(myTableRows => {
    users = myTableRows;
  })

 // /user/:id
router.get('/user', ctx => {
    ctx.body = users;
})

app.use(router.allowedMethods())
app.use(router.routes())
app.use(require('koa-body')())

const port = 3001
app.listen(port, () => {
    console.log('running on port'+port)
}) 