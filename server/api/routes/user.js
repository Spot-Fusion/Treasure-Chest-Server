const Router = require('koa-router');

const userRouter = new Router({ prefix: '/user' });

userRouter.get('/', async (ctx) => {
  ctx.body = 'Hello, World!\n';
  console.log(ctx.body);
});

module.exports.userRouter = userRouter;
