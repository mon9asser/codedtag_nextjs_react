const { mongoose, connection } = require("./../config/connection");
const { Helper } = require("./../config/helper");

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let postsSchema = new Schema({
    post_type: {
        type: Number, 
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
	enable_beside_title: {
        type: Boolean,  
        default: true
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
    enable_ads: {
        type: Boolean,  
        default: true
    },
    page_template: {
        type: String,  
        default: '' // no_found_404 - contact_us - about_us - 
    },
    keyphrase: {
        type: String, 
        default: ""
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
    views: {
        type: Number, 
        default: 0
    },
    article_thumbnail_url: {
        type: String, 
        trim: true,
        default: ""
    },
    selected_tab: {
        title: {
            type: String, 
            trim: true,
            default: "/Root"
        },
        slug: {
            type: String, 
            trim: true,
            default: ""
        },
        _id: {
            type: String, 
            trim: true,
            default: "root"
        }
    },
    ...Helper.defaultSchema
});

// Create text index on post_title field
postsSchema.index({ post_title: 'text' });

// Create Collection
var Posts = mongoose.model("posts", postsSchema);

module.exports = { Posts };
