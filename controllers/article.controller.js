const ArticleModel = require("../models/article.model");
const ObjectId = require("mongoose").Types.ObjectId;

/************** Create article **************/

exports.createArticle = async (req, res) => {
  const { name, types, price } = req.body;

  try {
    const article = new ArticleModel({
      name: name,
      types: types,
      price: price,
    });
    await article.save();
    res.status(200).json({ article: article._id });
  } catch (err) {
    res.status(500).send(err);
  }
};

/************** GET Methods **************/

exports.getArticle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  ArticleModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getAllArticles = async (req, res) => {
  ArticleModel.find({}, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getRecentArticles = async (req, res) => {
  ArticleModel.find({})
    .sort("-createdAt")
    .limit(parseInt(req.params.howmany))
    .exec((err, docs) => {
      if (!err) res.send(docs);
      else return res.status(500).json(err);
    });
};

exports.getArticlesWithType = async (req, res) => {
  try {
    const articles = await ArticleModel.find({});
    const articlesToSend = articles.filter((article) => {
      return article.types.includes(req.params.type);
    });

    res.send(articlesToSend);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/************** Modify article **************/

exports.updateName = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { name } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: name },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateTypes = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { types } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { types: types },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updatePrice = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { price } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { price: price },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateDescription = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { description } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { description: description },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateAvailable = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { available } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { available: available },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateSizes = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  const { sizes } = req.body;

  try {
    ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { sizes: sizes },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

/************** Delete article **************/

exports.deleteArticle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json("ID unknow: " + req.params.id);

  ArticleModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send("Article " + docs._id + " successfully deleted");
    else return res.status(500).send(err);
  });
};
