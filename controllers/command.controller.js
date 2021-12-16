const CommandModel = require("../models/command.model");
const ArticleModel = require("../models/article.model");
const ClientModel = require("../models/client.model");
const ObjectId = require("mongoose").Types.ObjectId;
const { isEmpty } = require("../utils/isEmpty.utils");

/************** Create command **************/

exports.createCommand = async (req, res) => {
  const {
    email,
    phoneNumber,
    address,
    content,
    totalCost,
    client,
    instruction,
  } = req.body;

  let error = false;

  try {
    const articlesInCommand = content.map((item) => item.article);
    const articlesDocs = await ArticleModel.find({
      _id: { $in: articlesInCommand },
    });

    articlesDocs.forEach(async (article) => {
      for (let i = 0; i < content.length; i++) {
        if (content[i].article === article._id.toString()) {
          let found = false;
          article.sizes.forEach((size) => {
            if (size.size === content[i].size) {
              if (size.quantity < content[i].quantity) {
                error = true;
                return;
              } else {
                found = true;
                size.quantity -= content[i].quantity;
              }
            }
          });
          if (!found) {
            error = true;
            return;
          }
        }
      }
    });

    if (error) {
      return res.status(500).send("Not Enough stocks");
    }

    articlesDocs.forEach(async (article) => {
      await article.save();
    });

    const newCommand = new CommandModel({
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      content: content,
      totalCost: totalCost,
      client: isEmpty(client) ? "" : client,
      instruction: isEmpty(instruction) ? "" : client,
    });

    const command = await newCommand.save();

    ClientModel.findByIdAndUpdate(
      client,
      {
        $addToSet: { commands: command._id },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(command);
        else return res.status(500).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

/************** Get Methods **************/

exports.getCommand = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  CommandModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getAllCommands = async (req, res) => {
  CommandModel.find({}, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getCommandsWithState = async (req, res) => {
  CommandModel.find({ state: req.params.state }, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getCommandsByClient = async (req, res) => {
  CommandModel.find({ client: req.params.id }, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(500).json(err);
  });
};

exports.getCommandsContainArticle = async (req, res) => {
  try {
    const commands = await CommandModel.find({});
    const commandsToSend = [];

    commands.forEach((command) => {
      const articles = command.content.map((item) => item.article);
      if (articles.includes(req.params.article)) {
        commandsToSend.push(command);
      }
    });

    res.send(commandsToSend);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/************** Update State **************/

exports.updateState = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    CommandModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { state: req.body.state },
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

/************** Delete command **************/

exports.deleteCommand = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);

  try {
    const command = await CommandModel.findById(req.params.id);

    const client = command.client;

    await CommandModel.findByIdAndDelete(req.params.id);

    if (!isEmpty(client)) {
      ClientModel.findByIdAndUpdate(
        client,
        {
          $pull: { commands: command._id },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err)
            res.send("Command " + command._id + " succesfully deleted");
          else return res.status(500).json(err);
        }
      );
    } else {
      res.send("Command " + command._id + " succesfully deleted");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};
