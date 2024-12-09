import express from "express";
import cors from "cors";
import { port, connectDB, sequelize } from "./config/dbConfig.js";
import routes from "./Routes.js";

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("✅ Database synchronized.");
  } catch (error) {
    console.error("❌ Error syncing database:", error.message);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await syncDatabase();
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // Exit the process if server startup fails
  }
};

export default startServer;
