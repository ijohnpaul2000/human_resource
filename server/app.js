const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const { errorHandler } = require("./middlewares/errorMiddleware");

//* ROUTES IMPORTS
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const applicantRoutes = require("./routes/applicantRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const requirementRoutes = require("./routes/RequirementRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

//* ENV Variables
const PORT = process.env.PORT || 5000;

//* Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* CORS

let _CORSWHITELIST = ["http://157.245.146.115:3000/", "http://localhost:3000"];

var _corsOptions = {
  origin: function (origin, callback) {
    if (_CORSWHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

var _corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(_corsOptions));

//* Routers
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/requirements", requirementRoutes);
app.use("/api/employees", employeeRoutes);

//* Database
const db = require("./models");
const { options } = require("./routes/userRoutes");

//* App Middleware
app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server and Database running on port ${PORT}`);
  });
});
