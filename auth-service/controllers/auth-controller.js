const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "SECRETO_SEGURO_AQUI";

const generateToken = (id) => {
    return jwt.sign({ id}, JWT_SECRET, {
        expiresIn: '30d',
    });
};


exports.registerUser = async (requestAnimationFrame, res) => {
    const {username, password} = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya registrado'});
        }

        const user = await User.create({ username, password });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message});
        
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({message: 'Credenciales inválidas'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};


exports.validateToken = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!token) return res.status(401).json({message: 'Token no proporcionado'});

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({userId: decoded.id});
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado'});
    }
};

