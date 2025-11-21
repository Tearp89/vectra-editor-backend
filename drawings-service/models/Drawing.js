const mongoose = require ('mongoose');

const DrawingSchema = new mongoose.Schema({

    userId: {
        type: String, 
        required: true
    },

    name: {
        type: String, 
        required: true, 
        trim: true
    },

    backgroundUrl: {
        type: String, 
        default: 'none' // Por defecto, sin imagen de fondo
    },
    
    svgContent: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Drawing', DrawingSchema);