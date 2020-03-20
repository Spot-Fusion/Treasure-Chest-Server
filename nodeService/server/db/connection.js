const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "cjl",
  host: "localhost",
  database: "chest"
})

module.exports = {
  pool,
};
