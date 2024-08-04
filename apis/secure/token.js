const express = require("express");  
var tokenRouter = express.Router();  
 
const {Config} = require("./../../config/options") 

const jwt = require('jsonwebtoken'); 
 
// generate token 
tokenRouter.get("/hash-request", async(req, res) => {

 
    var api_keys = req.headers['x-api-key'];
    var agent = req.headers['agent'];
    if( ! agent || ! api_keys ) {
        
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }

    // validate api keys 
    if( api_keys !== Config.api_keys ) {
       //console.log('tract 2')
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }

    const payload = {
        agent: agent,
        site_name: 'c_o_d_e_d_t_a_g_for_t_u_t_o_r_i_a_l_s'
    };
    
    // Secret key
    const secretKey = Config.jwt_secret;
      
    // Options
    const options = {
        expiresIn: '1m' // Token will expire in 1 miuntes
    };
      
    try {
        // Generating the token
        const token = jwt.sign(payload, secretKey, options);
        
        return res.send({
            data: token,
            is_error: false, 
            message: 'token fetched successfully!'
        });

    } catch (error) {
       // console.log('tract 3')
        return res.send({
            is_error: true, 
            message: 'Invalid credentials',
            data: []
        })
    }

})


module.exports = { tokenRouter };