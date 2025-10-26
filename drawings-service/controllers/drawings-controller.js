const Drawing = require('../models/Drawing');

exports.saveDrawing = async (req, res) => {
    const { userId, name, svgContent } = req.body;

    if(!userId || !name || !svgContent) {
        return res.status(400).json({ message: 'Faltan datos requeridos (userId, name o svgContent'});

    }

    try {
        const newDrawing = new Drawing({ userId, name, svgContent });
        await newDrawing.save();

        res.status(201).json({
            message: 'Dibujo guardado exitosamente.',
            id: newDrawing._id
        });
    } catch (error) {
        res.status(500).json({message: 'Error al guardad el dibujo', error: error.message});
    }
};

exports.getDrawingList = async (req, res) => {

    const userId = req.query.userId;

    if(!userId) {
        return res.status(403).json({ message: 'ID de usuario para listar es requerido'});

    }

    try{

        const drawings = await Drawing.find({userId: userId})
            .select('_id name createdAt')
            .sort({ createdAt: -1});
        
        res.status(200).json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de dibujos', error: error.message});
    }
};


exports.loadDrawingById = async (req, res) => {
    const userId = req.query.userId;
    const drawingId = req.params.id;

    if(!userId) {
        return res.status(403).json({ message: 'No autorizado'});
    }

    try {
        const drawing = await Drawing.findOne({ _id: drawingId, userId: userId});
        
        if(!drawing) {
            return res.status(404).json({ message: 'Dibujo no encontrado o no pertenece a este usuario'});
        }

        res.status(200).json(drawing);
    } catch (error) {
        res.status(500).json({ message: 'Error al cargar el dibujo', error: error.message});
    }
};

