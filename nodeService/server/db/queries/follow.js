const { pool } = require('../connection');

const follow = (id_user, id_following) => {
  const query = `
  INSERT INTO 
  "selection" (id_user, id_following)
  VALUES ($1, $2);`;
  return pool.query(query, [id_user, id_following]);
};

const getFollowing = (id) => {
  const query = `
  SELECT account.id, account.name, account.icon
  FROM "account", "selection"
  WHERE selection.id_user = $1 
  AND selection.id_following = account.id
  AND selection.id_following IS NOT NULL;`; 
  return pool.query(query, [id])
    .then((listing) => listing.rows );
};

const getFollowers = (id) => {
  const query = `
  SELECT account.id, account.name, account.icon
  FROM "account", "selection"
  WHERE selection.id_following = $1 
  AND selection.id_user = account.id
  AND selection.id_following IS NOT NULL;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows);
};

const stopFollowing = (id_user, id_following) => {
  const query = `
  DELETE FROM "selection"
  WHERE id_user = $1
  AND id_following = $2;`;
  return pool.query(query, [id_user, id_following]);
};

module.exports = {
  follow,
  getFollowing,
  getFollowers,
  stopFollowing
}