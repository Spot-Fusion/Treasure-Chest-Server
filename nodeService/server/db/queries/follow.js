const { pool } = require('../connection');

const follow = (id_user, id_following) => {
  const query = `
  INSERT INTO 
  "selection" (id_user, id_following)
  VALUES ($1, $2);`;
  return pool.query(query, [id_user, id_following]);
};

const isFollowing = (id_user, id_following) => {
  const query = `
  SELECT * FROM
  "selection"
  WHERE id_user = $1
  AND id_following = $2;`;
  return pool.query(query, [id_user, id_following])
    .then((listing) => !!listing.rows.length);
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

const getFollowingCount = (id) => {
  const query = `
  SELECT COUNT(*)
  FROM "account", "selection"
  WHERE selection.id_user = $1 
  AND selection.id_following = account.id
  AND selection.id_following IS NOT NULL;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows[0].count);
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

const getFollowersCount = (id) => {
  const query = `
  SELECT COUNT(*)
  FROM "account", "selection"
  WHERE selection.id_following = $1 
  AND selection.id_user = account.id
  AND selection.id_following IS NOT NULL;`;
  return pool.query(query, [id])
    .then((listing) => listing.rows[0].count);
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
  isFollowing,
  getFollowing,
  getFollowingCount,
  getFollowers,
  getFollowersCount,
  stopFollowing
}