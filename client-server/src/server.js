import express from "express";
import cors from "cors";
import { port, connectDB, sequelize } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js"; // Uncomment when needed

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes); // Uncomment when routes are defined

// Sync Sequelize models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("✅ Database synchronized.");
  } catch (error) {
    console.error("❌ Error syncing database:", error.message);
    throw error; // Re-throw to handle it during server startup
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await syncDatabase();
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

export default startServer;
