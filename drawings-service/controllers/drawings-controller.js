const Drawing = require('../models/Drawing');
const mongoose = require('mongoose');

exports.saveDrawing = async (req, res) => {
    const { userId, name, svgContent, backgroundUrl } = req.body;

    if (!userId || !name || !svgContent) {
        return res.status(400).json({ message: 'Faltan datos requeridos (userId, name o svgContent)' });
    }

    try {
        const newDrawing = new Drawing({ 
            userId, 
            name, 
            svgContent,
            backgroundUrl: backgroundUrl || '' 
        });
        await newDrawing.save();

        res.status(201).json({
            message: 'Dibujo guardado exitosamente.',
            id: newDrawing._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el dibujo', error: error.message });
    }
};




exports.getDrawingList = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(403).json({ message: 'ID de usuario para listar es requerido' });
    }

    try {
        const drawings = await Drawing.find({ userId: userId })
            .select('_id name createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de dibujos', error: error.message });
    }
};

exports.updateDrawing = async (req, res) => {
    const { userId, name, svgContent, backgroundUrl } = req.body;
    const drawingId = req.params.id;

    if (!userId || !name || !svgContent) { /* ... */ }

    try {
        const drawing = await Drawing.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(drawingId), userId: userId }, 
            { 
                name: name, 
                svgContent: svgContent,
                backgroundUrl: backgroundUrl
            },
            { new: true, runValidators: true }
        );

        if (!drawing) {

            return res.status(404).json({ message: 'Dibujo no encontrado o no autorizado para actualizar.' });
        }

        res.status(200).json({
            message: 'Dibujo actualizado exitosamente.',
            id: drawing._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

exports.loadDrawingById = async (req, res) => {
    const userId = req.query.userId;
    const drawingId = req.params.id;

    if (!userId) { return res.status(403).json({ message: 'No autorizado' }); }

    try {
        const drawing = await Drawing.findOne({ 
            _id: new mongoose.Types.ObjectId(drawingId), 
            userId: userId 
        });

        if (!drawing) {
            return res.status(404).json({ message: 'Dibujo no encontrado o no pertenece a este usuario' });
        }

        res.status(200).json(drawing);
    } catch (error) {
        res.status(500).json({ message: 'Error al cargar el dibujo', error: error.message });
    }
};