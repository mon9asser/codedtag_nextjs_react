const {mongoose} = require("./../config/connection");


// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let settingsSchema = new Schema({
     
    banner_site_title: { 
        type: String ,
        trim : true,
        default: "" 
    },
    banner_site_description: {
        type: String ,
        trim : true,
        default: ""
    }, 
    site_address: {
        type: String ,
        trim : true,
        default: ""
    },
    beside_post_title: {
        type: String ,
        trim : true,
        default: ""
    },
    site_meta_title: {
        type: String ,
        trim : true,
        default: ""
    },
    site_meta_description: {
        type: String ,
        trim : true,
        default: ""
    },
    google_analytics: {
        enabled: {
            type: Boolean ,
            trim : true,
            default: false
        },
        field: {
            type: String ,
            trim : true,
            default: ""
        }, 
    },
    script_url_1: {
        enabled: {
            type: Boolean ,
            trim : true,
            default: false
        },
        url_field: {
            type: String ,
            trim : true,
            default: ""
        },
    },
    script_url_2: {
        enabled: {
            type: Boolean ,
            trim : true,
            default: false
        },
        url_field: {
            type: String ,
            trim : true,
            default: ""
        },
    }
});



// Create Collection
var Sets = mongoose.model("settings" , settingsSchema );



module.exports = {Sets};