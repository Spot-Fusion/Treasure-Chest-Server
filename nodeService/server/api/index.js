const combineRouters = require('koa-combine-routers');
const { userRouter } = require('./routes/user');
const { listingRouter } = require('./routes/listing');
const { messageRouter } = require('./routes/message');
const { followRouter } = require('./routes/follow');

const router = combineRouters(
  userRouter,
  listingRouter,
  followRouter,
  messageRouter,
)

module.exports.router = router;