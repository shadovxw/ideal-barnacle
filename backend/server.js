import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";
import usersRouter from "./routes/users.js";
import subscriptionsRouter from "./routes/subscriptions.js";

const app = express();
app.use(express.json());

// CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/users", usersRouter);
app.use("/subscriptions", subscriptionsRouter);

// DB Connection
sequelize.sync({ alter: true }) // creates/updates tables automatically
  .then(() => console.log("✅ Database connected & synced"))
  .catch(err => console.error("❌ DB error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
