import {Settings} from "./settings"; 
import axios from 'axios';
import CryptoJS from 'crypto-js';


class HelperData {

    validateEmail(email){
       // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateHttpsStatus = async (link) => {
      
        const url =  decodeURIComponent(link);
    
        try {
            const response = await axios.get(url, {
                // Increase maxRedirects to follow redirects
                maxRedirects: 5, 
                validateStatus: function (status) {
                    // Accept status codes between 200 and 400 (valid and redirect responses)
                    return status >= 200 && status < 400; 
                }
            });
            
            console.log(response);

            const { status, statusText } = response;
            const is_redirect = status >= 300 && status < 400;
    
            const objex = {
                status,
                type: statusText,
                is_redirect,
                url
            };
    
            return {
                is_error: false,
                data: objex,
                message: "Fetched Successfully!"
            };
        } catch (error) {
            // Check if it's an actual 404 error or a CORS issue
            console.error("Error fetching URL:", error);
    
            return {
                is_error: true,
                data: null,
                message: error.response ? `Error: ${error.response.status}` : "Failed to fetch"
            };
        }
    };

    formatNumber(num) {
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
        } else if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        } /*else if (num >= 100) {
          return num + 'h';
      }*/ else {
          
            return num.toString();
        }
    }
    generateObjectId() {
        var timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
        var randomPart = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        });
        return timestamp + randomPart;
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

    async generateToken(user_browser) {

      var request = await axios({
        method: 'get',
        url: `${Settings.server.api}/hash-request`, 
        headers: {
          'x-api-key': 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132', 
          'agent': user_browser
        }
      });

      return request.data;
    }
    
    async sendRequest ({api, method, data, headers, is_create, is_file } = null) {
 
            var generate_token = await this.generateToken(navigator.userAgent)
            if( generate_token.is_error ) {
              return; 
            }

            var token = generate_token.data;
            
            if( headers === undefined ) {
                headers = {};
            }
            
            headers["authorization"] = token;
            headers["x-api-key"] = 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132';
             
            
            if( is_create === undefined ) {
              is_create = false; 
            }

            
            
            try {
              if( is_file == undefined || ! is_file ) {
                data["Secret-codedtag-api-key"] = Settings.keys.secret ;
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
                
                if(data.data_array != undefined ) {
                  data.data_array = data.data_array.map( x => {
                    return {
                      ...x, ...additional
                    }
                  })
                } else {
                  data = {...data, ...additional}
                }

              }
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
                message: reqs.message || "Something went wrong, try later",
                is_error: true 
              }
          }
    
        } catch (error) { 
           
          return  {
              data: [],
              message: error?.response?.data?.message || "Something went wrong, try later",
              is_error: true 
          }
        } 
         
    }

    getGravatarUrl(email, size = 200) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = CryptoJS.SHA256(trimmedEmail).toString();
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }

    randomizer = () => {
      
      // Generate a random number between 0 and 999999
      const randomNumber = Math.floor(Math.random() * 1000000);
      
      // Convert the number to a string and pad with leading zeros if necessary
      const paddedNumber = randomNumber.toString().padStart(6, '0');
      
      return paddedNumber;

    }

}

var Helper = new HelperData(); 

export {
  Helper
}