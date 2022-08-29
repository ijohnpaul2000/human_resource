const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const { errorHandler } = require("./middlewares/errorMiddleware");

//* ROUTES IMPORTS
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const applicantRoutes = require("./routes/applicantRoutes");

//* ENV Variables
const PORT = process.env.PORT || 5000;

//* Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

//* Routers
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applicants", applicantRoutes);

//* Database
const db = require("./models");

//* App Middleware
app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server and Database running on port ${PORT}`);
  });
});
