import {Settings} from "./settings"; 
import axios from 'axios';

class HelperData {

    validateEmail(email){
       // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async logut () { 

      await localStorage.clear();
      var session = await localStorage.getItem("sesstion")
      if( session == null ) {
        return true; 
      }

      return false;

    }

    async checkUserCapabilities(pageName) {
      
      // session data 
      var session = JSON.parse(localStorage.getItem("session"));
       
      if( session === null || session.token === undefined || session.token === "" ) {
        return {
          redirect_to: "",
          is_accessed: false
        }; 
      }
      
      // passed check caps by request = settings
      var reqs = await this.sendRequest({
          api: "user/capabilities",
          method: "post",
          data: {
            token: session.token,
            page: pageName
          }
      })
      console.log(reqs);
      if( reqs.is_error ) { 
        return {
          redirect_to: reqs.redirect_to,
          is_accessed: false
        }; 
      }

      return {
        redirect_to: reqs.redirect_to,
        is_accessed: true
      }; 

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
              return reqs.data;
          } else { 
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