
const { db_name } = require("./db")

const Config = {

    server: {
        api: "/api",
        port: process.env.port || 5000 
    },

    database: {
        name: db_name,
        host: "mongodb://localhost",
        port: "27017",
        options: {
            useMongoClient : true 
        },
        link: () => {

            return  Config.database.host + ':'
                    Config.database.port + '/'
                    Config.database.name;
        
        }
    }

};

module.exports = { Config };