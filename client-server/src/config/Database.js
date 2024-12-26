import knex from "knex";
import env from "./Env.js";

const config = {
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 20,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
};

const DB = knex(config);

export default DB;
