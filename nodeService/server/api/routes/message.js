const Router = require('koa-router');

const messageRouter = new Router({ prefix: '/message' });

messageRouter.get('/', async (ctx) => {
  ctx.body = 'Hello, Message!\n';
  console.log(ctx.body);
});

module.exports.messageRouter = messageRouter;
