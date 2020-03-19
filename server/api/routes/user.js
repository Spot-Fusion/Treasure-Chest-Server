const Router = require('koa-router');
const {
  addUser,
  getUser
} = require('../../db/queries/user');

const userRouter = new Router({ prefix: '/user' });

// Create new user
userRouter.post('/', async (ctx) => {
  const { name, bio, email, icon } = ctx.request.body
  await addUser(name, bio, email, icon)
    .then((a) => {
      console.log(a);
      ctx.body = 'Successfully added user';
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500
      ctx.body = "User already exists"
    })
});

// Get user by name
userRouter.get('/:name', async (ctx) => {
  console.log(ctx.params.name)
  const { name } = ctx.params
  await getUser(name)
    .then((user) => {
      console.log('Successfully got user');
      ctx.body = user;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "User not found"
    })
});

module.exports.userRouter = userRouter;
