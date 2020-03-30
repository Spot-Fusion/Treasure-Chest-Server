const combineRouters = require('koa-combine-routers');
const { testRouter } = require('./routes/test');
const { userRouter } = require('./routes/user');
const { listingRouter } = require('./routes/listing');
const { messageRouter } = require('./routes/message');
const { followRouter } = require('./routes/follow');
const { favoriteRouter } = require('./routes/favorite');

const router = combineRouters(
  testRouter,
  userRouter,
  listingRouter,
  followRouter,
  favoriteRouter,
  messageRouter,
)

module.exports.router = router;