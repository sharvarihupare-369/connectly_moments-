const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/TokenBlacklistModel");
require('dotenv').config()

async function authMiddleware(req, res, next) {
    const token = req.headers['authorization'].split(" ")[1]
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    const isTokenBlackListed = await BlackListModel.findOne({ token })
    if (isTokenBlackListed) {
        return res.status(400).send('Token has been blacklisted')
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(400).send('Invalid token');
    }
}

module.exports = authMiddleware;