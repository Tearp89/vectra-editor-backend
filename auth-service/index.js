const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');

const app = express();
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Auth Service: Conectando a MongoDB'))
    .catch(err => {
        console.error('Auth Service: Error de conexión a MongoDB: ', err);
        process.exit(1);
    });

app.use('/', authRoutes);

app.listen(AUTH_SERVICE_PORT, () => {
    console.log(`Auth Service corriendo en puerto ${AUTH_SERVICE_PORT}`);
});

