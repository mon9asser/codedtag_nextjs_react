import React from 'react'
import {Settings} from "./settings"; 
import axios from 'axios';
import CryptoJS from 'crypto-js';


 

class HelperData {

    validateEmail(email){
       // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    generateJsonLdWebPage = (url, pageTitle, siteId, imageUrl, datePublished, dateModified, description, breadcrumbItems) => {
        // Constructing the JSON-LD object
        const jsonLdObject = {
            "@context": "https://schema.org",
            "@graph": [{
                "@type": "WebPage",
                "@id": url,
                "url": url,
                "name": pageTitle,
                "isPartOf": {
                    "@id": siteId
                },
                "primaryImageOfPage": {
                    "@id": url + "/#primaryimage"
                },
                "image": {
                    "@id": url + "/#primaryimage"
                },
                "thumbnailUrl": imageUrl,
                "datePublished": datePublished,
                "dateModified": dateModified,
                "description": description,
                "breadcrumb": {
                    "@id": url + "/#breadcrumb"
                },
                "inLanguage": "en-US",
                "potentialAction": [{
                    "@type": "ReadAction",
                    "target": [url]
                }]
            }, {
                "@type": "ImageObject",
                "inLanguage": "en-US",
                "@id": url + "/#primaryimage",
                "url": imageUrl,
                "contentUrl": imageUrl
            }, {
                "@type": "BreadcrumbList",
                "@id": url + "/#breadcrumb",
                "itemListElement": breadcrumbItems.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.name,
                    "item": item.url
                }))
            }, {
                "@type": "WebSite",
                "@id": siteId,
                "url": siteId,
                "name": "CodedTag", // Replace with actual site name if dynamic
                "description": "Unlock the world of coding for free! With online platforms, interactive tutorials, and coding communities, learn at your own pace and explore limitless possibilities. Start your coding journey now! #LearnToCode #FreeResources",
                "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": siteId + "?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }],
                "inLanguage": "en-US"
            }]
        };
    
        return jsonLdObject;
    }
 
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
          
          if(data.data_array != undefined ) {
            data.data_array = data.data_array.map( x => {
              return {
                ...x, ...additional
              }
            })
          } else {
            data = {...data, ...additional}
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
          console.log(error?.response?.data?.message);
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

    initMethods () {
          
        // slide Items 
        this.slideitems();
        
    }


    slideDownElem = (elem, duration = 200) => {
        elem.style.display = 'block';  // Make the element visible
        let startHeight = 0;
        let endHeight = elem.scrollHeight;  // Get the natural height of the element
    
        elem.style.height = startHeight + 'px';  // Start animation from 0 height
    
        let startTime = Date.now();  // Get the start time
    
        function animate() {
            let elapsedTime = Date.now() - startTime;
            let nextHeight = Math.min(endHeight, (elapsedTime / duration) * endHeight);
            elem.style.height = nextHeight + 'px';  // Update the height
    
            if (nextHeight < endHeight) {
                requestAnimationFrame(animate);  // Continue the animation
            } else {
                elem.style.height = null;  // Clear the inline height style
            }
        }
    
        requestAnimationFrame(animate);  // Start the animation
    }
    
    slideUpElem = (elem, duration = 200) => {
        let startHeight = elem.scrollHeight;
        let endHeight = 0;
    
        let startTime = Date.now();
    
        function animate() {
            let elapsedTime = Date.now() - startTime;
            let nextHeight = Math.max(endHeight, startHeight - (elapsedTime / duration) * startHeight);
            elem.style.height = nextHeight + 'px';
    
            if (nextHeight > endHeight) {
                requestAnimationFrame(animate);
            } else {
                elem.style.display = 'none';  // Hide the element
                elem.style.height = null;  // Clear the inline height style
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    toggleSlide(elem) {
        let myList = elem;
        
        if (window.getComputedStyle(myList).display === 'none') {
            this.slideDownElem(myList);
        } else {
            this.slideUpElem(myList);
        }
    }
    

    slideitems = () => {

        var _this = this; 

        var items = document.querySelectorAll("li.has-slideitem");
         
        if( !items.length ) {
            return; 
        }

        items.forEach((item, index) => {
            var elem = Array.from(item.childNodes).filter(item => item.tagName.toLowerCase() == "a");
            if( ! elem.length ) {
                return; 
            }

            elem[0].addEventListener("click", function(e){

                this.classList.toggle("active")

                e.preventDefault();
                
                var ul = this.nextElementSibling;
                ul.style.overflow = "hidden";
                _this.toggleSlide(ul);

            });

        });

    }

}

var Helper = new HelperData(); 

export {
  Helper 
}