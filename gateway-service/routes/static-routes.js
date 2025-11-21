const express = require('express');
const router = express.Router();
const controller = require('../controllers/gateway-controller');

// Esta ruta no debe tener el prefijo /api/
router.get('/internal/assets/:filename', controller.serveAsset);

module.exports = router;