const Router = require('koa-router');
const {
  createListing,
  getListing,
  getListings,
  updateListing
} = require('../../db/queries/listing');

const listingRouter = new Router({ prefix: '/listing' });

// Create new listing
listingRouter.post('/', async (ctx) => {
  const {
    id_seller, 
    id_category,  
    name,
    description,
    price,
    zipcode,
    negotiable
  } = ctx.request.body

  await createListing(id_seller, id_category, name, description, price, zipcode, negotiable)
    .then((id) => {
      console.log('Successfully created post');
      ctx.body = id;
    })
    .catch((err) => {
      console.error(err);
      ctx.response.status = 500
      ctx.body = "Post already exists"
    })
});

// Get listing by id
listingRouter.get('/:id', async (ctx) => {
  const { id } = ctx.params
  await getListing(id)
    .then((post) => {
      console.log('Successfully got post');
      ctx.body = post;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Post not found"
    })
});

// Get listings by category
listingRouter.get('/', async (ctx) => {
  let category = ctx.request.body.category || '';
  await getListings(category)
    .then((post) => {
      console.log('Successfully got post');
      ctx.body = post;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Post not found"
    })
});

// Update listing
listingRouter.patch('/:id', async (ctx) => {
  const { id } = ctx.params
  const {
    name,
    description,
    price,
    zipcode,
    negotiable
  } = ctx.request.body
  await updateListing(name, description, price, zipcode, negotiable, id)
    .then((post) => {
      console.log('Successfully updated post');
      ctx.body = post;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Post not found"
    })
});

module.exports.listingRouter = listingRouter;
