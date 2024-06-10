const {mongoose} = require("./../config/connection");
const { Helper } = require("./../config/helper")

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let chapterSchema = new Schema({
    
    chapter_title: String,
    tutorial: {
        id: mongoose.Schema.Types.ObjectId
    },
    tab: {
        _id: {
            type: String,
            default: "root"
        },
        title: {
            type: String,
            default: "/Root"
        },
        slug: {
            type: String,
            default: ""
        }
    },
    posts: [],
    /*
    {
        id: mongoose.Schema.Types.ObjectId,
        post_title: String,
        slug: String
    }
    */
    
    ...Helper.defaultSchema
});



// Create Collection
var Chapters = mongoose.model("chapters" , chapterSchema );



module.exports = {Chapters};




