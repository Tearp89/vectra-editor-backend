const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api-routes');
const staticRoutes = require('./routes/static-routes');

const app = express();
const GATEWAY_PORT = process.env.GATEWAY_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', staticRoutes);

app.use('/api', apiRoutes);

app.listen(GATEWAY_PORT, () =>{
    console.log(`Gateway Service corriendo en puerto ${GATEWAY_PORT}`);
})