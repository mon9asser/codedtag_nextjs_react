/** @type {import('next').NextConfig} */
import os from 'os';

const nextConfig = { 
    reactStrictMode: true,
    productionBrowserSourceMaps: true, 
    trailingSlash: true,  
    images: {
        remotePatterns: [
          {
              protocol: 'https',
              hostname: 'media.codedtag.com',
          }
        ],
    },  
    
    async rewrites() {
        return [
          {
            source: '/sitemap_articles.xml',
            destination: '/api/sitemap_articles',
          },
          {
            source: '/sitemap_pages.xml',
            destination: '/api/sitemap_pages',
          },
          {
            source: '/sitemap_users.xml',
            destination: '/api/sitemap_users',
          },
          {
            source: '/sitemap_tutorials.xml',
            destination: '/api/sitemap_tutorials',
          }, 
          
          {
            source: '/sitemap_tabs.xml',
            destination: '/api/sitemap_tabs',
          }, 

          {
            source: '/sitemap_index.xml',
            destination: '/api/sitemap_index',
          }, 

          {
            source: '/robots.txt',
            destination: '/api/robots',
          }, 
          
          {
            source: '/ads.txt',
            destination: '/api/ads',
          }, 
        ];
    },
    
    async redirects() {
        var api_key = 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132';
    
        try {
            var httHashReq = await fetch("https://api.codedtag.com/hash-request", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "agent": 'User Agent Data'
                }
            });
    
            var hash_json = await httHashReq.json();
            //console.log('Hash Request Response:', hash_json);
    
            if(hash_json.is_error) {
                return [];
            }
    
            var token = hash_json.data;
    
            var redirect_http = await fetch("https://api.codedtag.com/redirects", {
                cache: 'force-cache',
                headers: {
                  "x-api-key": api_key,
                  "authorization": token
                }
            });
            
            var responseText = await redirect_http.text();
             
            //console.log('Redirects Response Text:', responseText);
    
            // Check if responseText is valid JSON
            try {
                var json = JSON.parse(responseText);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                return [];
            }
    
            if(json.is_error) {
                return [];
            }
    
            var redirects = json.data;
            if(!redirects.length) {
                return [];
            }
    
            redirects = redirects.map(x => { 
                return {
                    source: x.from,
                    destination: x.to,
                    permanent: parseInt(x.redirectType) == 301 ? true : false,
                };
            });
            
            redirects.push({
              source: '/Root',
              destination: '/',
              permanent: true,
            });

            return redirects;
    
        } catch (error) {
            console.error('Error in redirects function:', error);
            return [];
        }
    },
     
};

export default nextConfig;
