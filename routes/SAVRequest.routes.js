const router = require('express').Router();
const SAVRequestController = require('../controllers/SAVRequest.controller');

// Create SAVRequest
router.post("/send-savrequest", SAVRequestController.sendSAVRequest);

// GET Methods
router.get("/get-all-savrequests", SAVRequestController.getAllSAVRequests);
router.get("/get-savrequest/:id", SAVRequestController.getSAVRequest);
router.get("/get-savrequests-with-state/:state", SAVRequestController.getSAVRequestsWithState);

// Modify state
router.put("/update-state/:id", SAVRequestController.updateState);

// Delete SAVRequest
router.delete("/delete-savrequest/:id", SAVRequestController.deleteSAVRequest);

module.exports = router;