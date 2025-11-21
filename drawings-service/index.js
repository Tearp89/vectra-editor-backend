const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const drawingRoutes = require('./routes/drawings-routes');

const app = express();
const DRAWINGS_SERVICE_PORT = process.env.DRAWINGS_SERVICE_PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Drawing Service: Conectado a MongoDB'))
    .catch(err => {
        console.error('Drawings Service: Error de conexión a MongoDB', err);
        process.exit(1);
    });

app.use('/internal', drawingRoutes);

app.listen(DRAWINGS_SERVICE_PORT, () => {
    console.log(`Drawing service (Dibujos) corriendo en puerto ${DRAWINGS_SERVICE_PORT}`);
});