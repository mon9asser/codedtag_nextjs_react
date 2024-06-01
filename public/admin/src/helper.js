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
      var session = await localStorage.getItem("session")
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

    async sendRequest ({api, method, data, headers, is_create } = null) {

        if( headers === undefined ) {
            headers = {};
        }
        
        if( is_create === undefined ) {
          is_create = false; 
        }

        data["Secret-codedtag-api-key"] = Settings.keys.secret ;
         
        try {
           
           
          var session = localStorage.getItem("session"); 
           
          var additional = {}; 
          if( session != null ) {
            session = JSON.parse(session)
            // updated data 
            additional = {
              updated_date: Date.now(),
              updated_by: {
                id: session.id,
                name: session.full_name,
                email: session.email,
                thumbnail: session.thumbnail,
              }
            };
            
            // created data 
            if(is_create) { 
                additional.created_date= Date.now();
                additional.created_by = {
                  id: session.id,
                  name: session.full_name,
                  email: session.email,
                  thumbnail: session.thumbnail,
                }
            }

          }

          var reqs = await axios({
            method: method,
            url: `${Settings.server.api}/${api}`,
            data: {...data, ...additional},
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
          console.log(error);
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