import express from "express";
import cors from "cors";

import env from "./config/dotEnv.js";
import db from "./config/dbConfig.js";
import userRoutes from "./Routes.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);

const connectDB = async () => {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("🚀 Database connection successful");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () =>
      console.log(`🚀 Server running on port ${env.PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

export default startServer;
