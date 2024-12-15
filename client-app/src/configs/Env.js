import dotenv from "dotenv";

dotenv.config();

// Optionally validate required environment variables
// const requiredVariables = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
// requiredVariables.forEach((varName) => {
//   if (!process.env[varName]) {
//     console.error(`❌ Missing required environment variable: ${varName}`);
//     process.exit(1);
//   }
// });

export default process.env;
