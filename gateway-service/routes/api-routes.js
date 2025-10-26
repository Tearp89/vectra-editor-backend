
const express = require('express');
const router = express.Router();

const controller = require('../controllers/gateway-controller');
const { protect } = require('../middleware/auth-middleware'); 
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/auth/register', controller.register); 
router.post('/auth/login', controller.login);

router.post('/assets/upload', upload.single('image'), controller.uploadAsset);

router.get('/internal/assets/:filename', controller.serveAsset);


router.post('/drawings', protect, controller.saveDrawing); 

router.get('/drawings', protect, controller.getDrawingsList); 

router.get('/drawings/:id', protect, controller.loadDrawingById);

module.exports = router;