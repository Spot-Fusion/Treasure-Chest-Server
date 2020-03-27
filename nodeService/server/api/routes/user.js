const Router = require('koa-router');
const {
  addUser,
  getUserByEmail,
  getUserById,
  editUser,
} = require('../../db/queries/user');

const userRouter = new Router({ prefix: '/user' });

// Create new user
userRouter.post('/', async (ctx) => {
  const { name, bio, email, icon } = ctx.request.body
  await addUser(name, bio, email, icon)
    .then((id) => {
      console.log('Successfully added user');
      ctx.body = id;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500
      ctx.body = "User already exists"
    })
});

// Get user by email
userRouter.get('/:email', async (ctx) => {
  console.log(ctx.params.email)
  const { email } = ctx.params
  await getUserByEmail(email)
    .then((user) => {
      console.log('Successfully got user');
      ctx.body = user;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "User not found"
    })
});

// Get user by id
userRouter.get('/id/:id', async (ctx) => {
  const { id } = ctx.params
  await getUserById(id)
    .then((user) => {
      console.log('Successfully got user');
      ctx.body = user;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "User not found"
    })
});

// Update profile
userRouter.post('/update/:id', async (ctx) => {
  const { id } = ctx.params
  const { name, bio, icon } = ctx.request.body
  await editUser(name, bio, icon, id)
    .then((user) => {
      console.log('Successfully updated user');
      console.log(user);
      ctx.body = user;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500
      ctx.body = "Error updating user"
    })
});

module.exports.userRouter = userRouter;
