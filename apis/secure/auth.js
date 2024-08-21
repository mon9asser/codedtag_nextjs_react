const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {Config} = require("./../../config/options") 

// Middleware to verify token
const verifyToken = (req, res, next) => {
    
  var token = req.headers['authorization'];
  var api_keys = req.headers['x-api-key'];
  console.log("api_keys", api_keys)
  if( api_keys == undefined  ) {
    return res.send({
        message: 'Invalid Credentials',
        is_error: true, 
        data: []
    });
  } 
	 console.log("api_keys2", Config.api_keys)
	console.log("1:========>>", api_keys.toString() != Config.api_keys.toString())
	console.log("2:========>>", api_keys.toString() )
	console.log("3:========>>", Config.api_keys.toString() )
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
  
  try {
	  console.log("token", token)
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
    return res.send({
      message: 'Invalid Credentials.',
      is_error: true, 
      data: []
    });
  }
  
};


module.exports = {verifyToken} 