const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

var secretKey = 'thiciscodeaasdsad5550';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            message: 'Token is required.',
            is_error: true, 
            data: []
        });
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {

      if (err) {
        return res.status(401).send({
            message: 'Invalid token.',
            is_error: true, 
            data: []
        });
      }

      req.crypted_usr = decoded;
      next();

    });
};



module.exports = {verifyToken} 