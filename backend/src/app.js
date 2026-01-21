const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares

app.use(
  cors({
    origin: "http://localhost:3001", // Next.js URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const healthRoutes = require("./routes/health.routes");
// const organizationRoutes = require("./routes/organizations.route");
// const projectRoutes = require("./routes/projects.routes");
// const pageRoutes = require("./routes/pages.routes");
// const componentRoutes = require("./routes/components.routes");
// const elementRoutes = require("./routes/elements.routes");

// app.use("/api/elements", elementRoutes);
// app.use("/api/components", componentRoutes);
// app.use("/api/pages", pageRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/health", healthRoutes);
// app.use("/api/organizations", organizationRoutes);
app.use("/api/organizations", require("./routes/organizations.routes"));
app.use("/api/projects", require("./routes/projects.routes"));
app.use("/api/pages", require("./routes/pages.routes"));
app.use("/api/components", require("./routes/components.routes"));
app.use("/api/elements", require("./routes/elements.routes"));

// Global error handler (IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
