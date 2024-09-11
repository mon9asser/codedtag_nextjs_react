import Config from "./config.js";
import he from 'he';
import { createElement } from "react";
import Script from 'next/script';

class HelperData {

  decodeHtmlEntities(text) {
    return he.decode(text);  
  }


  validateEmail(email){
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 }
 
  generate_slugs = (text) => {
    return text
      .toLowerCase()          // Convert all characters to lowercase
      .replace(/\s+/g, '-')   // Replace all spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove all non-word characters except hyphens
  }
  
  chunkArray(array, chunkSize) {
    if (chunkSize <= 0) {
      throw new Error("No Posts found!");
    }
    
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    
    return result;
  }

  produceNumber = (number) => {
      
    var num = number + 1;

    var string = `0${num}`
    if( num > 10 ) {
      string = `${num}`
    }
    
    return string;

  }
  
  formatNumber(numer) {
      var num = parseInt(numer); 
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

  renderArrayElements_old = (elements) => {
      
    if( elements == undefined ) {
      return []
    }

    return elements.map((element, index) => { 
        const { type, props } = element;
        return createElement(type, { ...props, key: index });
    });

  }

  formatDate = (dateString) => {

      const date = new Date(dateString);


      // Format the date components separately
      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'long' });
      const year = date.getFullYear();

      // Combine them with a comma
      const formattedDate = `${day} ${month}, ${year}`;
      
      return formattedDate;

  }
  renderArrayElements = (elements) => {
      // Check if 'elements' is undefined or not an array
      if (!Array.isArray(elements) || elements.length === 0) {
          return null; // Return null if elements are undefined or empty
      }

      return elements.map((element, index) => {
          const { type, props } = element;

          // Sanitize the props by decoding any HTML entities in string values
          const sanitizedProps = { ...props };
          Object.keys(sanitizedProps).forEach((key) => {
              if (typeof sanitizedProps[key] === 'string') {
                  sanitizedProps[key] = he.decode(sanitizedProps[key]);
              }
          });

          // Handle script tags
          if (type === 'script') {
              // If 'src' exists, it's an external script
              if (sanitizedProps.src) {
                  return (
                      <Script
                          key={index}
                          src={sanitizedProps.src}
                          strategy="beforeInteractive" // You can customize the strategy
                          {...sanitizedProps}
                      />
                  );
              }
              // If 'children' is defined, it's an inline script
              else if (sanitizedProps.children) {
                  return (
                      <Script
                          key={index}
                          strategy="afterInteractive" // You can customize the strategy
                          dangerouslySetInnerHTML={{ __html: sanitizedProps.children }}
                      />
                  );
              }
          }

          // For other elements, render as usual
          return createElement(type, { ...sanitizedProps, key: index });
      });
  }



  formated_published_date = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const textValue = date.toLocaleDateString('en-US', options);
    const datetimeValue = date.toISOString();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    
    return {
        value: datetimeValue,
        text: textValue// `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
    };
  }
     

  generateToken = async () => {
     
    const staticData = await fetch(`${Config.api}/hash-request`, {
      //cache: 'force-cache',
      headers: {
        "x-api-key": Config.app_key,
        "agent": 'User Agent Data'
      }
    });
  
    return staticData;
  };
  

  sendRequest = async ({api, method, data, headers }) => {

    if( headers === undefined ) {
        headers = {};
    }
    
    
    var token = '';

    // generate token 
    var request = await this.generateToken();
    if( request.status == 200 ) {
      var response = await request.json();
      if( ! response.is_error ) {
        token = response.data;
      }
    } 

    headers["x-api-key"] = Config.app_key 
    headers["authorization"] = token;
    
    var requestObject = { 
     // cache: 'force-cache',
      headers,
      method 
    }

    if( method.toLowerCase() == 'post') { 
      requestObject.body = data; 
    }

    
    var url = `${Config.api}/${api}`;
    
    var response = await fetch(`${url}`, requestObject ); 
     
    return response;
  }

}

var Helper = new HelperData();

export {Helper, HelperData}; 
