const { pool } = require('../connection');

const addUser = (name, bio, email, icon) => {
  const query = `
  INSERT INTO 
  "account" (name, bio, email, icon)
  VALUES ($1, $2, $3, $4)
  RETURNING id;`;
  return pool.query(query, [name, bio, email, icon])
    .then((users) => users.rows[0]);
};

const getUserByEmail = (email) => {
  const query = `
  SELECT * FROM
  "account" WHERE email = $1`;
  return pool.query(query, [email])
    .then((users) => users.rows[0]);
};

const getUserById = (id) => {
  const query = `
  SELECT * FROM
  "account" WHERE id = $1`;
  return pool.query(query, [id])
    .then((users) => users.rows[0]);
};

const editUser = (name, bio, icon, id) => {
  const query = `
  UPDATE "account"
  SET name = $1, bio = $2, icon = $3
  WHERE id = $4
  RETURNING *`;
  return pool.query(query, [name, bio, icon, id])
    .then((users) => users.rows[0]);
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  editUser,
}