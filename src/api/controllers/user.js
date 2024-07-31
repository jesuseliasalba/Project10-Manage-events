const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../config/jwt");
const { deleteFile } = require("../../utils/deleteFile");

const registerUser = async (req, res, next) => {
  try {
    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("This username already exists");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      img: req.body.img,
      name: req.body.name,
      surname: req.body.surname,
      mail: req.body.mail,
    });

    if (req.files) {
      newUser.img = req.files.img[0].path;
    }

    const userCreated = await newUser.save();
    res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("The username or password is incorrect");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json("The username or password is incorrect");
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  const user = req.user;
  res.status(200).json(user);
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("This username already exists");
    }

    const userModify = new User(req.body);

    if (userModify.password) {
      let pw = userModify.password;
      pw = bcrypt.hashSync(pw, 10);
      userModify.password = pw;
    }

    if (req.files) {
      const user = await User.findById(id);
      deleteFile(user.img);
      userModify.img = req.files.img[0].path;
    }

    userModify._id = id;
    userModify.rol = await User.findById(id).rol;

    const userUpdated = await User.findByIdAndUpdate(id, userModify, {
      new: true,
    });

    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

const updateOwnUser = async (req, res, next) => {
  try {
    const userUnique = await User.findOne({ username: req.body.username });
    if (userUnique !== null) {
      return res.status(400).json("Este nombre de usuario ya existe");
    }

    const userModify = new User(req.body);

    if (userModify.password) {
      let pw = userModify.password;
      pw = bcrypt.hashSync(pw, 10);
      userModify.password = pw;
    }
    const id = req.user._id;
    if (req.files) {
      const user = await User.findById(id);
      deleteFile(user.img);
      userModify.img = req.files.img[0].path;
    }
    userModify._id = id;
    userModify.rol = await User.findById(id).rol;
    const userUpdated = await User.findByIdAndUpdate(id, userModify, {
      new: true,
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);
    deleteFile(userDeleted.img);
    return res.status(200).json(userDeleted);
  } catch (error) {
    next(error);
  }
};

const deleteOwnUser = async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user._id);
    deleteFile(userDeleted.img);
    return res.status(200).json(userDeleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  getUsers,
  updateUser,
  updateOwnUser,
  deleteUser,
  deleteOwnUser,
};
