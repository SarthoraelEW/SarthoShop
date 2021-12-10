const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/client.controller');

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// GET method
router.get("/get-client/:id", clientController.getClient);

// Modify client
router.put('/update-address/:id', clientController.updateAddress);
router.patch('/add-card/:id', clientController.addCard);
router.patch('/delete-card/:id', clientController.deleteCard);

// Delete client
router.delete('/delete-client/:id', clientController.deleteClient);

// Email verification
router.get("/verify-email/:id/:token", clientController.verifyEmail);

// Phone verification
router.patch('/get-verification-code/:id', clientController.getVerificationCode);
router.patch('/check-verification-code/:id', clientController.checkVerificationCode);

module.exports = router;