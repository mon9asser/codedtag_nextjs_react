import {Settings} from "./settings"; 
import axios from 'axios';

class HelperData {

    validateEmail(email){
       // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async sendRequest ({api, method, data, headers} = null) {

        if( headers === undefined ) {
            headers = {};
        }
    
        data["Secret-codedtag-api-key"] = Settings.keys.secret ;
         
        try {
    
          var reqs = await axios({
            method: method,
            url: `${Settings.server.api}/${api}`,
            data: data,
            headers: {
              'CT-public-api-key': Settings.keys.public,
              ...headers
            }
          });
    
          if( reqs.status === 200 ) {
            return {
              data: reqs.data.data,
              message: reqs.data.message,
              is_error: false 
            }
          } else {
    
            console.log(reqs);
            return {
              data: [],
              message: "Something went wrong, try later",
              is_error: true 
            }
          }
    
        } catch (error) {
          return  {
              data: [],
              message: "Something went wrong, try later",
              is_error: true 
          }
        } 
         
    }

}

var Helper = new HelperData(); 

export {
  Helper
}