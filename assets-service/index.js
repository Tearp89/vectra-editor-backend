const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const ASSETS_SERVICE_PORT = process.env.ASSETS_SERVICE_PORT || 3003;

const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)){
    fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const allowedMines = ['image/jpeg', 'image/png', 'image/gif'];
        if(allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF'), false);
        }
    }
});

app.post('/internal/assets/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    res.status(201).json({
        message: 'Imagen subida exitosamente.',
        imageUrl: `/internal/assets/${req.file.filename}` 
    });
}, (error, req, res, next) => {
    res.status(400).json({ message: error.message });
});

app.use('/internal/assets', express.static(UPLOAD_DIR));

app.listen(ASSETS_SERVICE_PORT, () => {
    console.log(`Assets Service (Activos) corriendo en puerto ${ASSETS_SERVICE_PORT}`);
});


