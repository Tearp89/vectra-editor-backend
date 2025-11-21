const express = require('express');
const router = express.Router();
const controller = require('../controllers/gateway-controller');

router.get('/internal/assets/:filename', controller.serveAsset);

module.exports = router;