const { pool } = require('../connection');

const favorite = (id_user, id_listing) => {
  const query = `
  INSERT INTO 
  "selection" (id_user, id_listing)
  VALUES ($1, $2);`;
  return pool.query(query, [id_user, id_listing]);
};

const isFavorite = (id_user, id_listing) => {
  const query = `
  SELECT * FROM
  "selection"
  WHERE id_user = $1
  AND id_listing = $2;`;
  return pool.query(query, [id_user, id_listing])
  .then((listing) => !!listing.rows.length);
};

const getFavorites = (id) => {
  const query = `
  SELECT listing.id as id_listing, listing.name, listing.created_at, listing.price, listing.archived, image.image
  FROM "listing", "selection", "image"
  WHERE selection.id_user = $1 
  AND selection.id_listing = listing.id
  AND listing.id = image.id_listing
  AND selection.id_listing IS NOT NULL;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows);
};

const unFavorite = (id_user, id_listing) => {
  const query = `
  DELETE FROM "selection"
  WHERE id_user = $1
  AND id_listing = $2;`;
  return pool.query(query, [id_user, id_listing]);
};

module.exports = {
  favorite,
  isFavorite,
  getFavorites,
  unFavorite
}