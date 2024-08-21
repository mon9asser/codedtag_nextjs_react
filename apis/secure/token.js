const express = require("express");  
var tokenRouter = express.Router();  
 
const {Config} = require("./../../config/options") 

const jwt = require('jsonwebtoken'); 
 
// generate token 
tokenRouter.get("/hash-request", async(req, res) => {

 
    var api_keys = req.headers['x-api-key'];
    var agent = req.headers['agent'];
	
	console.log(api_keys);
	console.log(agent);
	console.log('trace 1');
    if( ! agent || ! api_keys ) {
        
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }
	
	console.log('trace 2');

    // validate api keys 
    if( api_keys !== Config.api_keys ) {
       //console.log('tract 2')
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }
	
	console.log('trace 3');
    const payload = {
        agent: agent,
        site_name: 'c_o_d_e_d_t_a_g_for_t_u_t_o_r_i_a_l_s'
    };
    
	console.log('payload', payload);
    // Secret key
    const secretKey = Config.jwt_secret;
      
    // Options
    const options = {
        expiresIn: '1m' // Token will expire in 1 miuntes
    };
	
	console.log('options', options);
      
    try {
        // Generating the token
        const token = jwt.sign(payload, secretKey, options);
		
		console.log(token);
        
        return res.send({
            data: token,
            is_error: false, 
            message: 'token fetched successfully!'
        });

    } catch (error) {
		console.log(error)
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }

})


module.exports = { tokenRouter };