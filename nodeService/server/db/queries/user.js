const { pool } = require('../connection');

const addUser = (name, bio, email, icon) => {
  const query = `
  INSERT INTO 
  "account" (name, bio, email, icon)
  VALUES ($1, $2, $3, $4);`;
  return pool.query(query, [name, bio, email, icon]);
};

const getUser = (email) => {
  const query = `
  SELECT * FROM
  "account" WHERE email = $1 `;
  return pool.query(query, [email])
    .then((users) => users.rows[0]);
};

module.exports = {
  addUser,
  getUser,
}