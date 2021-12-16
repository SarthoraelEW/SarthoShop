const router = require('express').Router();
const articleController = require('../controllers/article.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

// Create article
router.post("/create-article", articleController.createArticle);

// GET Methods
router.get('/get-article/:id', articleController.getArticle);
router.get('/get-all-articles', articleController.getAllArticles);
router.get('/get-recent-articles/:howmany', articleController.getRecentArticles);
router.get('/get-articles-with-type/:type', articleController.getArticlesWithType);

// Modify article
router.put('/update-name/:id', articleController.updateName);
router.put('/update-types/:id', articleController.updateTypes);
router.put('/update-price/:id', articleController.updatePrice);
router.put('/update-description/:id', articleController.updateDescription);
router.put('/update-available/:id', articleController.updateAvailable);
router.put('/update-sizes/:id', articleController.updateSizes);

// Delete article
router.delete('/delete-article/:id', articleController.deleteArticle);

// Upload and delete Photos
router.patch('/upload-photos/:id', upload.array('files'), uploadController.uploadPhotos);
router.patch('/delete-photo/:id', uploadController.deletePhoto);

module.exports = router;