
const { db_name } = require("./db")
 
const Config = {
     
    
    // this object to be empty case uploaded on online server 
    localhost: {
        site_url: "http://localhost:5000", // "" => empty 
        dashboard_url: "http://localhost:3000/dashboard",
        login: "http://localhost:3000/login"
    }, 

    redirect_to: "/tutorials",

    server: {
        sitemap: "", // slug shuould be started with slash /
        robots: "", // slug shuould be started with slash /
        api: "/api",
        port: process.env.port || 5000 
    },
    
    // serve image uploads on server
    uploads: {
        serve: "uploads",   // https://example.com/uploads/... fetch image
        folder: `public`, // public/uploads upload image to folder
    }, 
    jwt_secret: "__Coded__Tag__",   
    database: {
        name: db_name,
        host: "mongodb://127.0.0.1",
        port: "27017",
        options: {
            useMongoClient : true 
        },
        link: () => {

            return  Config.database.host + ':' +
                    Config.database.port + '/' +
                    Config.database.name;
        
        }
    }

};

module.exports = { Config };