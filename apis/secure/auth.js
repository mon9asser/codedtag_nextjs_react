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
	 
 
  if( api_keys.toString() != Config.api_keys.toString() ) {
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
  
  // Decode the token without verification
const decoded = jwt.decode(token, { complete: true });
console.log('Manually decoded token:', decoded);

  
  try {
	  
	
	 
    jwt.verify(token, Config.jwt_secret, (err, decoded) => {
	
	console.log("----sitename_dsco", decoded.agent, decoded.site_name)
	
      if (err || decoded.agent == undefined || decoded.site_name == undefined ) { 
        return res.send({
            message: 'Invalid Credentials.',
            is_error: true, 
            data: []
        });
      } 
	  
	  
		console.log("----agent", decoded.agent)
		console.log("----site_name", decoded.site_name)
      if(decoded.site_name !== 'c_o_d_e_d_t_a_g_for_t_u_t_o_r_i_a_l_s') {
        return res.send({
            message: 'Invalid Credentials.',
            is_error: true, 
            data: []
        });
      }
       
   console.log("----decoded", decoded) 
      req.crypted_usr = decoded;
      next();

    });
  } catch (error) {
	  console.log(error);
    return res.send({
      message: 'Invalid Credentials.',
      is_error: true, 
      data: []
    });
  }
  
};


module.exports = {verifyToken} 