const { pool } = require('../connection');

const addUser = (name, bio, email, icon) => {
  const query = `
  INSERT INTO 
  "user" (name, bio, email, icon)
  VALUES ($1, $2, $3, $4);`;
  return pool.query(query, [name, bio, email, icon]);
};

const getUser = (name, bio, email, icon) => {
  const query = `
  SELECT * FROM
  "user" WHERE id = $1 `;
  return pool.query(query, [name, bio, email, icon])
    .then((users) => users[0]);
};

module.exports = {
  addUser,
  getUser,
}