const Router = require('koa-router');
const {
  favorite,
  isFavorite,
  getFavorites,
  unFavorite,
} = require('../../db/queries/favorite');

const favoriteRouter = new Router({ prefix: '/favorite' });

// favorite listing
favoriteRouter.post('/:id_user/:id_listing', async (ctx) => {
  const {
    id_user,
    id_listing
  } = ctx.params;

  await favorite(id_user, id_listing)
    .then(() => {
      ctx.body = 'Successfully favorited listing';
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    });
});

// get user favorite
favoriteRouter.get('/:id_user/:id_listing', async (ctx) => {
  const {
    id_user,
    id_listing
  } = ctx.params;

  await isFavorite(id_user, id_listing)
    .then((isFavorited) => {
      ctx.body = isFavorited;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    });
});

// Get all favorites from an account
favoriteRouter.get('/:id_user', async (ctx) => {
  const { id_user } = ctx.params;

  await getFavorites(id_user)
    .then((users) => {
      console.log('Successfully got favorite listings');
      ctx.body = users;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    });
});

// Unfavorite a post
favoriteRouter.delete('/:id_user/:id_listing', async (ctx) => {
  const { id_user, id_listing } = ctx.params;

  await unFavorite(id_user, id_listing)
    .then(() => {
      console.log('Successfully unfavorited');
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500;
    });
});

module.exports.favoriteRouter = favoriteRouter;
