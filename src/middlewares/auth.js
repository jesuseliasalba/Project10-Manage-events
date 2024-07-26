const User = require("../api/models/user");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json("No estas autorizado");
    }

    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json("No estas autorizado");
    }

    const parsedToken = token.replace("Bearer ", "");

    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(401).json("You need admin privileges");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuth, isAdmin };
