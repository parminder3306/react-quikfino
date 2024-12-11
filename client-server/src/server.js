import express from "express";
import cors from "cors";

import env from "./config/dotEnv.js";
import db from "./config/dbConfig.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/transactions", transactionRoutes);
// app.use("/api/v1/currency-rates", currencyRoutes);

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
