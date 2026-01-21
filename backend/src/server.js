require("dotenv").config();

const app = require("./app");
const sequelize = require("./db/sequelize");

// Import models ONCE (important)
require("./models/organization");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // AUTO SYNC (DEV ONLY)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("🔄 Database synced");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
