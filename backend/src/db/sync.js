require("dotenv").config();
const sequelize = require("./sequelize");

// Import all models
require("../models/Organization");

async function syncDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: true });
    console.log("🔄 DB synced successfully");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

syncDB();
