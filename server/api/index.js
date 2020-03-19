const combineRouters = require('koa-combine-routers');
const { userRouter } = require('./routes/user');
const { listingRouter } = require('./routes/listing');
const { messageRouter } = require('./routes/message');

const router = combineRouters(
  userRouter,
  listingRouter,
  messageRouter,
)

module.exports.router = router;