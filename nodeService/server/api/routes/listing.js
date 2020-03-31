const Router = require('koa-router');
const {
  createListing,
  getListing,
  getImages,
  insertImage,
  getListings,
  getUserListings,
  updateListing,
  archiveListing,
  deleteListing,
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
    .then((posts) => {
      console.log('Successfully got posts');
      ctx.body = posts;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Posts not found"
    })
});

// Get listings by category
listingRouter.get('/user/:id/:archived', async (ctx) => {
  const { id, archived } = ctx.params;
  await getUserListings(id, archived)
    .then((posts) => {
      console.log('Successfully got posts');
      ctx.body = posts;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Posts not found";
    })
});

// Get images by id
listingRouter.get('/:id/images', async (ctx) => {
  const { id } = ctx.params;
  await getImages(id)
    .then((images) => {
      console.log('Successfully got images');
      ctx.body = images;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "No images found";
    })
});

// insert image
listingRouter.post('/:id_listing', async (ctx) => {
  const { id_listing } = ctx.params;
  const { image } = ctx.request.body;
  await insertImage(id_listing, image)
    .then((images) => {
      console.log('Successfully created image');
      ctx.body = images;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Image not posted"
    })
});

// Update listing
listingRouter.patch('/update/:id', async (ctx) => {
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
      ctx.body = "Error updating post";
    })
});

// Update listing
listingRouter.patch('/archive/:id', async (ctx) => {
  const { id } = ctx.params
  await archiveListing(id)
    .then((post) => {
      console.log('Successfully archived post');
      ctx.body = post;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Error archiving post";
    })
});

listingRouter.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  await deleteListing(id)
    .then((images) => {
      console.log('Successfully deleted listing');
      ctx.body = images;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = "Error deleting listing"
    })
});

module.exports.listingRouter = listingRouter;
