const express = require("express");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const healthRoutes = require("./routes/health.routes");
app.use("/api/health", healthRoutes);

module.exports = app;
