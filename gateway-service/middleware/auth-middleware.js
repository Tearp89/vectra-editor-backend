const axios = require('axios');

const AUTH_SERVICE_URL = 'http://auth-service:3002';

exports.protect = async (req, res, next) => {
    const token = req.headers.authorization;

    if(token && token.startsWith('Bearer')) { 
        try { 
            const validationResponse = await axios.post(
                `${AUTH_SERVICE_URL}/validate-token`,
                {},
                { headers: { authorization: token}}
            );

            req.userId = validationResponse.data.userId;
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token inválido.'});
        }
    } else {
        res.status(401).json({ message: 'No autorizado, no se encontró token'});
    }
};

