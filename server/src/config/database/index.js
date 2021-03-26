const knex = require("knex");

const config_codes = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_SERVER,
  },
};
const config_code_w = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_CODEW,
  },
};
const config_code_v = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_CODEV,
  },
};
const config_code_i = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_CODEI,
  },
};

const codes = knex(config_codes);
const code_w = knex(config_code_w);
const code_v = knex(config_code_v);
const code_i = knex(config_code_i);

module.exports = {
  codes,
  code_w,
  code_v,
  code_i,
};
