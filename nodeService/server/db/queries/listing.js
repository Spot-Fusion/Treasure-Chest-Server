const { pool } = require('../connection');

const createListing = (seller, category, name, description, price, zipcode, negotiable) => {
  const query = `
  INSERT INTO 
  "listing" (id_seller, id_category, name, description, price, zipcode, negotiable, archived )
  VALUES ($1, $2, $3, $4, $5, $6, $7, 0)
  RETURNING id;`;

  return pool.query(query, [seller, category, name, description, price, zipcode, negotiable])
    .then((listing) => listing.rows[0].id);;
};

const insertImage = (id_listing, image) => {
  const query = `
  INSERT INTO 
  "image" (id_listing, image)
  VALUES ($1, $2)
  RETURNING id;`;

  return pool.query(query, [id_listing, image])
    .then((listing) => listing.rows[0].id);
}

const getImages = (id_listing) => {
  const query = `
  SELECT * FROM
  "image" WHERE
  id_listing = $1;`;
  return pool.query(query, [id_listing])
    .then((listing) => listing.rows);
}

const getListing = (id) => {
  const query = `
  SELECT listing.id, account.name as seller, listing.id_seller, category.name as category, listing.created_at, listing.name, listing.description, listing.price, listing.zipcode, listing.negotiable, listing.archived 
  FROM "listing", "account", "category" 
  WHERE listing.id = $1 
  AND listing.id_seller = account.id 
  AND listing.id_category = category.id;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows[0]);
};

const getListings = (category) => {
  if (category) {
    console.log('Category');
    const query = `
    SELECT listing.id, account.name as seller, category.name as category, listing.created_at, listing.name, listing.description, listing.price, listing.zipcode, listing.negotiable, listing.archived, image.image
    FROM "listing", "account", "category", "image"
    WHERE category.name = $1
    AND listing.id_seller = account.id 
    AND listing.id_category = category.id
    AND listing.id = image.id_listing;`;
    return pool.query(query, [category])
      .then((listing) => listing.rows);
  } else {
    console.log('No category');
    const query = `
    SELECT listing.id, account.name as seller, category.name as category, listing.created_at, listing.name, listing.description, listing.price, listing.zipcode, listing.negotiable, listing.archived, image.image
    FROM "listing", "account", "category", "image"
    WHERE listing.id_seller = account.id 
    AND listing.id_category = category.id
    AND listing.id = image.id_listing;`;
    return pool.query(query)
      .then((listing) => listing.rows);
  }
};

const updateListing = (name, description, price, zipcode, negotiable, id) => {
  const query = `
  UPDATE "listing"
  SET name = $1, description = $2, price = $3, zipcode = $4, negotiable = $5
  WHERE listing.id = $6;`;
  return pool.query(query, [name, description, price, zipcode, negotiable, id]);
};

const deleteListing = (id) => {
  const query = `
  DELETE FROM "listing"
  WHERE listing.id = $1;`;
  return pool.query(query, [id]);
};

module.exports = {
  createListing,
  getListing,
  insertImage,
  getImages,
  getListings,
  updateListing,
  deleteListing
}