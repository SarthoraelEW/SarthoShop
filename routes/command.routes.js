const router = require('express').Router();
const commandController = require('../controllers/command.controller');

// Create command
router.post("/create-command", commandController.createCommand);

// Get Methods
router.get("/get-command/:id", commandController.getCommand);
router.get("/get-all-commands", commandController.getAllCommands);
router.get("/get-commands-with-state/:state", commandController.getCommandsWithState);
router.get("/get-commands-by-client/:id", commandController.getCommandsByClient);
router.get("/get-commands-contain-article/:article", commandController.getCommandsContainArticle);

// Update State
router.put("/update-state/:id", commandController.updateState);

// Delete command
router.delete("/delete-command/:id", commandController.deleteCommand);

module.exports = router;