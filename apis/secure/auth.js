const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {Config} = require("./../../config/options") 

// Middleware to verify token
const verifyToken = (req, res, next) => {
    
  var token = req.headers['authorization'];
  var api_keys = req.headers['x-api-key'];
  
  if( api_keys == undefined  ) {
    return res.send({
        message: 'Invalid Credentials',
        is_error: true, 
        data: []
    });
  }

  if( api_keys !== Config.api_keys ) {
    return res.send({
        message: 'Invalid Credentials',
        is_error: true, 
        data: []
    });
    
  }

  if (token== undefined) {
      return res.send({
          message: 'Token is required.',
          is_error: true, 
          data: []
      });
  }
  
  try {
    jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			if (err.name === 'TokenExpiredError') {
				console.error('Token expired error:', err.message);
				return res.send({
					message: 'Token has expired.',
					is_error: true,
					data: []
				});
			} else {
				console.error('Token verification error:', err.message);
				return res.send({
					message: 'Invalid Credentials.',
					is_error: true,
					data: []
				});
			}
		}

		// Check if decoded is null or undefined
		if (!decoded) {
			console.error('Decoded token is null or undefined:', decoded);
			return res.send({
				message: 'Invalid Credentials.',
				is_error: true,
				data: []
			});
		}

		// Check if decoded has expected properties
		if (!decoded.agent || !decoded.site_name) {
			console.error('Decoded token missing properties:', decoded);
			return res.send({
				message: 'Invalid Credentials.',
				is_error: true,
				data: []
			});
		}

		console.log("----sitename_dsco", decoded.agent, decoded.site_name);

		// Validate the site_name
		if (decoded.site_name !== 'c_o_d_e_d_t_a_g_for_t_u_t_o_r_i_a_l_s') {
			return res.send({
				message: 'Invalid Credentials.',
				is_error: true,
				data: []
			});
		}

		console.log("----agent", decoded.agent);
		console.log("----site_name", decoded.site_name);
		console.log("----decoded", decoded);

		// Proceed with the request
		req.crypted_usr = decoded;
		next();
	});

  } catch (error) {
    return res.send({
      message: 'Invalid Credentials.',
      is_error: true, 
      data: []
    });
  }
  
};


module.exports = {verifyToken} 