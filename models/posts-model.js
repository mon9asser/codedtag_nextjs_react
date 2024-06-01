const {mongoose} = require("./../config/connection");
const { Helper } = require("./../config/helper")

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let postsSchema = new Schema({
    post_type: {
        type: Boolean, 
        default: 0
    },
    post_title: {
        type: String, 
        trim: true,
        default: ""
    },
    total_words: {
        type: String, 
        trim: true,
        default: ""
    },
    total_charachters: {
        type: String, 
        trim: true,
        default: ""
    },
    links: {
        type: Array,  
        default: []
    },
    blocks: {
        type: Array,  
        default: []
    },	
    meta_title: {
        type: String, 
        trim: true,
        default: ""
    },
    slug: {
        type: String, 
        trim: true,
        default: ""
    },
    meta_description: {
        type: String, 
        trim: true,
        default: ""
    },
    tutorial: {
        type: {},  
        default: {}
    },
    allow_search_engine: {
        type: Boolean, 
        default: true
    },
    canonical_url: {
        type: String, 
        trim: true,
        default: ""
    },
    is_published: {
        type: Boolean, 
        default: false
    },
    ...Helper.defaultSchema
});



// Create Collection
var Posts = mongoose.model("posts" , postsSchema );



module.exports = {Posts};