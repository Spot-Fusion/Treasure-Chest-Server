const { pool } = require('../connection');

const addUser = (name, bio, email, icon) => {
  const query = `
  INSERT INTO 
  "user" (name, bio, email, icon)
  VALUES ($1, $2, $3, $4);`;
  return pool.query(query, [name, bio, email, icon]);
};

const getUser = (name) => {
  const query = `
  SELECT * FROM
  "user" WHERE name = $1 `;
  return pool.query(query, [name])
    .then((users) => users.rows[0]);
};

module.exports = {
  addUser,
  getUser,
}