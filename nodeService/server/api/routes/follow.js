const Router = require('koa-router');
const {
  follow,
  isFollowing,
  getFollowing,
  getFollowingCount,
  getFollowers,
  getFollowersCount,
  stopFollowing
} = require('../../db/queries/follow');

const followRouter = new Router({ prefix: '/follow' });

// Follow user
followRouter.post('/:id_user/:id_following', async (ctx) => {
  const {
    id_user,
    id_following
  } = ctx.params


  await follow(id_user, id_following)
    .then(() => {
      ctx.body = 'Successfully followed user';
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// get if a user is following someone
followRouter.get('/isFollowing/:id_user/:id_following', async (ctx) => {
  const {
    id_user,
    id_following
  } = ctx.params

  await isFollowing(id_user, id_following)
    .then((is_following) => {
      ctx.body = is_following
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// get users that an account is following
followRouter.get('/following/:id', async (ctx) => {
  const { id } = ctx.params
  await getFollowing(id)
    .then((users) => {
      console.log('Successfully got following users');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// get number of users that an account is following
followRouter.get('/following/count/:id', async (ctx) => {
  const { id } = ctx.params
  await getFollowingCount(id)
    .then((users) => {
      console.log('Successfully got following users');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// Get users that an account is followed by
followRouter.get('/followed_by/:id', async (ctx) => {
  const { id } = ctx.params
  await getFollowers(id)
    .then((users) => {
      console.log('Successfully got following users');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

// Get number of users that an account is followed by
followRouter.get('/followed_by/count/:id', async (ctx) => {
  const { id } = ctx.params
  await getFollowersCount(id)
    .then((users) => {
      console.log('Successfully got following users count');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});
// Stop following another user
followRouter.delete('/:id_user/:id_following', async (ctx) => {
  const { id_user, id_following } = ctx.params
  await stopFollowing(id_user, id_following)
    .then(() => {
      console.log('Successfully stopped following user');
      ctx.response.status = 204;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    })
});

module.exports.followRouter = followRouter;
