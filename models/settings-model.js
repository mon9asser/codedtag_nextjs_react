const { mongoose } = require("./../config/connection");

// Create Schema
const Schema = mongoose.Schema;

let settingsSchema = new Schema({
    subscribe_title: {
        type: String,
        trim: true,
        default: ""
    },
    subscribe_description: {
        type: String,
        trim: true,
        default: ""
    },
    banner_site_title: {
        type: String,
        trim: true,
        default: ""
    },
    homepage_section_title: {
        type: String,
        trim: true,
        default: ""
    },
    homepage_section_description: {
        type: String,
        trim: true,
        default: ""
    },
    site_name: {
        type: String,
        trim: true,
        default: ""
    },
    banner_site_description: {
        type: String,
        trim: true,
        default: ""
    },
    site_address: {
        type: String,
        trim: true,
        default: ""
    },
    beside_post_title: {
        type: String,
        trim: true,
        default: ""
    },
    site_meta_title: {
        type: String,
        trim: true,
        default: ""
    },
    site_meta_description: {
        type: String,
        trim: true,
        default: ""
    },
    contact_email: {
        type: String,
        trim: true,
        default: ""
    },
    google_analytics: {
        enabled: {
            type: Boolean,
            trim: true,
            default: false
        },
        field: {
            type: String,
            trim: true,
            default: ""
        },
    },
    robots_file_contents: {
        type: String,
        default: ""
    },
    ads_file_contents: {
        type: String,
        default: ""
    },
    footer: {
        type: String,
        default: ""
    },
    header: {
        type: String,
        default: ""
    },
    site_logo: {
        type: String,
        trim: true,
        default: ""
    },

    circle_buttons:{
        type: Boolean, 
        default: false
    },
    share_social_buttons: {
        type: String,
        trim: true,
        default: ""
    },
});

// Create Collection
var Sets = mongoose.model("settings", settingsSchema);

module.exports = { Sets };
