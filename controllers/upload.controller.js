const ArticleModel = require("../models/article.model");
const { uploadFiles, deleteFile } = require("../middlewares/upload.middleware");
const ObjectId = require("mongoose").Types.ObjectId;

exports.uploadPhotos = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    const article = await ArticleModel.findById(req.params.id);
    const photos = await uploadFiles(req, article.photos.length);
    console.log(photos);

    article.photos = article.photos.concat(photos);
    await article.save();
    res.send(article);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deletePhoto = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    const article = await ArticleModel.findById(req.params.id);
    article.photos = article.photos.filter((url) => url !== req.body.photo);
    deleteFile(req.body.photo);
    await article.save();
    res.send(article);
  } catch (err) {
    return res.status(500).json(err);
  }
};