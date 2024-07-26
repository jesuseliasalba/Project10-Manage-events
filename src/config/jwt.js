const jwt = require("jsonwebtoken");

const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGN, { expiresIn: "1d" });
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SIGN);
};

module.exports = { generateSign, verifyJwt };
