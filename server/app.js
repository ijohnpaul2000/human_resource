const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

//* ROUTES IMPORTS
const userRoutes = require("./routes/userRoutes");

//* ENV Variables
const PORT = process.env.PORT || 5000;

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

//* Routers
app.use("/api/users", userRoutes);

//* Database
const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server and Database running on port ${PORT}`);
  });
});
