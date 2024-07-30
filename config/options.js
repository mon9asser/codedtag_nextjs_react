
const { db_name } = require("./db")
 
const Config = { 

    dashboard_url: "http://localhost.com:3000/dashboard",
    media_url: `http://localhost:5000/uploads`,
    site_url: "http://localhost:3000",
    login_url: "http://localhost:3000/login", 
    redirect_to: "/tutorials",

    server: {
        redirects: "",
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
    api_keys: 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132',
    jwt_secret: "codedtag_t1y4u5236985471zasde!gfh@qwe#$%hoj^ytu&*tu(ib)ib~gfhrytuibonphojlkmlbkxzasqwe",   
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