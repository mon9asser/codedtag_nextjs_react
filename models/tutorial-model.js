const {mongoose} = require("./../config/connection");


// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let tutorialSchema = new Schema({
    tutorial_title: {
        type: String ,
        trim : true,
        default: "" 
    },
    duration: {
        type: String ,
        trim : true,
        default: "" 
    },
    description: {
        type: String ,
        trim : true,
        default: "" 
    },
    selected_category: {
        type: {
            id:  {
                type: String ,
                trim : true,
                default: "" 
            },
	        name:  {
                type: String ,
                trim : true,
                default: "" 
            }
        },
        default: null
    },


    meta_title: {
        type: String ,
        trim : true,
        default: "" 
    },
    slug: {
        type: String ,
        trim : true,
        default: "" 
    },
    keyphrase: {
        type: String ,
        trim : true,
        default: "" 
    },
    meta_description: {
        type: String ,
        trim : true,
        default: "" 
    },
    options: {
        type: {
            show_total_of_tutorial: { type: Boolean , trim : true,  default: false },
            show_duration_time: { type: Boolean , trim : true,  default: false },
            enable_reviews: { type: Boolean , trim : true,  default: false },
            show_views: { type: Boolean , trim : true,  default: false },
            publish: { type: Boolean , trim : true,  default: false },
            hide_from_search_engines: { type: Boolean , trim : true,  default: false },
            
            // not completed !
            publish_chapters: { type: Boolean ,  default: false },
            
        }  
    },
    tabs: [
        {
            title:{ type: String , trim : true, default: "" },
            description:{ type: String , trim : true, default: "" },
            slug:{ type: String , trim : true, default: "" },
            keyphrase:{ type: String , trim : true, default: "" },
            meta_title:{ type: String , trim : true, default: "" },
            meta_description:{ type: String , trim : true, default: "" },
            hide_from_search_engines: { type: Boolean,  default: false },
            publish_chapters: { type: Boolean,  default: false },
        }
    ]
});



// Create Collection
var Tutorial = mongoose.model("tutorials", tutorialSchema );



module.exports = {Tutorial};