const axios = require('axios');
const FormData = require('form-data');

const AUTH_SERVICE_URL = 'http://auth-service:3002';
const DRAWINGS_SERVICE_URL = 'http://drawings-service:3001/internal';
const ASSETS_SERVICE_UPLOAD_URL = 'http://assets-service:3003/internal/assets/upload';
const ASSETS_SERVICE_BASE_URL = 'http://assets-service:3003';



exports.register = async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Auth Service' });
    }
};

exports.login = async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Auth Service' });
    }
};


exports.uploadAsset = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha adjuntado ningún archivo.' });
    }

    try {
        const form = new FormData();
        form.append('image', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const response = await axios.post(ASSETS_SERVICE_UPLOAD_URL, form, {
            headers: form.getHeaders(), 
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Assets Service' });
    }
};

exports.serveAsset = async (req, res) => {
    try {
        const fileUrl = `${ASSETS_SERVICE_BASE_URL}${req.originalUrl}`; 
        
        const response = await axios.get(fileUrl, { 
            responseType: 'stream'
        });

        res.set(response.headers);
        response.data.pipe(res);
    } catch (error) {
        res.status(404).send('Archivo estático no encontrado.');
    }
};



exports.saveDrawing = async (req, res) => {
    const drawingData = {
        ...req.body,
        userId: req.userId 
    };

    try {
        const response = await axios.post(`${DRAWINGS_SERVICE_URL}/drawings`, drawingData);
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Drawings Service' });
    }
};

exports.getDrawingsList = async (req, res) => {
    try {
        const response = await axios.get(`${DRAWINGS_SERVICE_URL}/drawings`, {
            params: {
                userId: req.userId 
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Drawings Service' });
    }
};

exports.loadDrawingById = async (req, res) => {
    try {
        const response = await axios.get(`${DRAWINGS_SERVICE_URL}/drawings/${req.params.id}`, {
            params: {
                userId: req.userId 
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        res.status(status).json(error.response.data || { message: 'Error de conexión con Drawings Service' });
    }
};