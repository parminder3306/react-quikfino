import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

const port = 86;
const jwtSecret = "Janny@123";

const dbConfig = {
  database: "quikfino",
  username: "root",
  password: null,
  host: "localhost",
  dialect: "mysql",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

export { port, jwtSecret, sequelize, connectDB };
