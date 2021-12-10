const jwt = require('jsonwebtoken');
const ClientModel = require('../models/client.model');

exports.checkClient = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.client = null;
                next();
            } else {
                let client = await ClientModel.findById(decodedToken.id);
                res.locals.client = client;
                next();
            }
        })
    } else {
        res.locals.client = null;
        next();
    }
};

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log(token);
    }
};