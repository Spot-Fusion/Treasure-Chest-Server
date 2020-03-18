const combineRouters = require('koa-combine-routers');
const { userRouter } = require('./routes/user');
const { messageRouter } = require('./routes/message');

const router = combineRouters(
  userRouter,
  messageRouter
)

module.exports.router = router;