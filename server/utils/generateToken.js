const jwt = require("jsonwebtoken");

const generateToken = (_userId) => {
  const secret = process.env.JWT_SECRET || "CAPSTONE_CEIT";

  return jwt.sign({ _userId }, secret, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
