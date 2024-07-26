const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const choosefolderName = (req, file) => {
  const route = req.baseUrl;
  let folderName = "proyecto10";
  if (route.includes("/user")) {
    folderName += "/user";
  } else {
    folderName += "/event";
  }
  return folderName;
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: choosefolderName,
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = { upload };
