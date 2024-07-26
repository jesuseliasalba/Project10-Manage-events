const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const folderName = `${imgSplited.at(-3)}/${imgSplited.at(-2)}`;
  const fieldName = imgSplited.at(-1).split(".");

  const public_id = `${folderName}/${fieldName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {});
};

module.exports = { deleteFile };
