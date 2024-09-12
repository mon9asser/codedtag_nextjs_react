const crypto = require('crypto');
const axios = require("axios");

class HelperData {

    defaultSchema = {
        updated_date: { type: Date, default: ""},
        created_date: { type: Date, default: ""},
        updated_by: {
            id: { type: String, default: ""},
            name: { type: String, default: ""},
            email: { type: String, default: ""},
            thumbnail: { type: String, default: ""}, 
        },
        created_by: {
            id: { type: String, default: ""},
            name: { type: String, default: ""},
            email: { type: String, default: ""},
            thumbnail: { type: String, default: ""}, 
        }    
    }
    
    extractDomainAndSubdomain = (url) => {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
    
        // Split the hostname into parts
        const parts = hostname.split('.');
    
        // Prepare the return object
        let result = {
            domain: '',
            subdomain: ''
        };
       
        if (parts.length > 2) {
            // Set the domain to the second-to-last part
            result.domain = parts[parts.length - 2];
    
            // Join the remaining parts except the last two as the subdomain
            result.subdomain = parts.slice(0, -2).join('.');
        } else if (parts.length === 2) {
            // Only the domain is present, no subdomain
            result.domain = parts[0];
        }
    
        return result;
    }

    replaceURLsInArray = (arr, findURL, replaceWith) => {
        return arr.map(subArray => {
          return subArray.map(item => {
            // Check if the item contains the URL
            if (item.includes(findURL)) {
              // Replace the URL
              return item.replace(findURL, replaceWith);
            }
            return item;
          });
        });
    }

    getGravatarUrl(email, size = 200) {
        const trimmedEmail = email.trim().toLowerCase();
        const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }

    validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    removeLastExtension(imageName) {
        // Find the last occurrence of a dot followed by an extension
        const lastDotIndex = imageName.lastIndexOf('.');
        if (lastDotIndex === -1) return imageName; // No dot found
        return imageName.substring(0, lastDotIndex);
    }

    getLastExtension(imageName) {
        // Find the last occurrence of a dot
        const lastDotIndex = imageName.lastIndexOf('.');
        if (lastDotIndex === -1) return ''; // No dot found
        return imageName.substring(lastDotIndex);
    }

    link_validator = async (link) => {
        try {
            const url = decodeURIComponent(link); 
             
            
            const response = await axios.get(url, {
                maxRedirects: 0,
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // default
                }
            });
            
            // Extract only the necessary data
            const { data, status, statusText, headers } = response;
            
            const is_redirect = status >= 300 && status < 400;
    
            const objex = {
                status: status,
                type: statusText,
                is_redirect: is_redirect,
                url: url
            };
    
            return {
                is_error: false, 
                data: objex, 
                message: "Fetched Successfully!"
            }
    
        } catch (error) { 
            
            // Handle the error properly 
            return {
                is_error: true, 
                data: null, 
                message: "Something went wrong"
            }
        }
    }
    

}

var Helper = new HelperData(); 

module.exports = { 
    Helper
}