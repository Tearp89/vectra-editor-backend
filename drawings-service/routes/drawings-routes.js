const express = require('express');
const router = express.Router();
const controller = require('../controllers/drawings-controller');

router.post('/drawings', controller.saveDrawing);
router.get('/drawings', controller.getDrawingList);
router.get('/drawings/:id', controller.loadDrawingById);
router.put('/drawings/:id', controller.updateDrawing);

module.exports = router;