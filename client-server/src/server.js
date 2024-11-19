import express from "express";
import cors from "cors";
import { port, connectDB, sequelize } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);

// // Sync Sequelize models with the database
// sequelize
//   .sync()
//   .then(() => {
//     console.log("✅ Database synchronized.");
//   })
//   .catch((error) => {
//     console.error("❌ Error syncing database:", error.message);
//   });

const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
};

export default startServer;
