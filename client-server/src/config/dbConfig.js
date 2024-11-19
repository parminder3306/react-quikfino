import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// Environment variables
const port = 5000;
const jwtSecret = "Janny@123";

const dbConfig = {
  database: "quikfino",
  username: "root",
  password: null,
  host: "localhost",
  dialect: "mysql",
};

// Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Disable SQL query logs for cleaner output
  }
);

// Database connection function
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1); // Exit process if the connection fails
  }
};

export { port, jwtSecret, sequelize, connectDB };
