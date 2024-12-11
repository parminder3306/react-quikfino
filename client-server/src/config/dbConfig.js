import knex from "knex";
import env from "./dotEnv.js";

const dbConfig = {
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
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const db = knex(dbConfig);

export default db;
