import express from "express";
import cors from "cors";

import env from "./config/Env.js";
import db from "./config/Database.js";

import api from "./routes/Api.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api/v1/", api);

const connectDB = async () => {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("🚀 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () =>
      console.log(`🚀 Server is up and running on port ${env.PORT}`)
    );
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

export default startServer;
