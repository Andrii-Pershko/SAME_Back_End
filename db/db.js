const { Client } = require("pg");

const client = new Client({
  user: "dev",
  host: "localhost",
  database: "same_database",
  password: "root",
  port: 8888,
});

module.exports = client;
