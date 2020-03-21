const Router = require('koa-router');

const testRouter = new Router({ prefix: '/' });

testRouter.get('/', async (ctx) => {
  ctx.body = 'Hello, World!\n';
});

module.exports.testRouter = testRouter;