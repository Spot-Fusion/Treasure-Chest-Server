const Koa = require('koa');
const cors = require('koa-cors');
const Logger = require('koa-logger');
const parser = require('koa-bodyparser');
const { router } = require('./api/index');
const { pool } = require('./db/connection.js');

const app = new Koa();

// Development logging
app.use(Logger());

//enable cors
app.use(cors());

//parsing body
app.use(parser());

//apiRouter
app.use(router());


//connect to db
pool.connect()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// Listen the port
app.listen(8080, () => {
  console.log('Server running on port 8080');
});