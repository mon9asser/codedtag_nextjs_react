const { mongoose, connection } = require("./../config/connection");
const { Helper } = require("./../config/helper");

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let mediaSchema = new Schema({

    title: String,
    name: String,
    description: String,
    url: String,
    
    is_model: { // if releate another model not direct
        type: Boolean, 
        default: false
    }, 
    model_name: { // like post, settings 
        type: String,
        trim: true,
        default: ''
    }, 
    model_id:  {  // post id or setting id 
        type: String,
        trim: true,
        default: ''
    },
    block_id: { // block of image id inside post
        type: String,
        trim: true,
        default: ''
    }, 

    createdAt: {
        type: Date,
        default: Date.now,
    },

});
 

// Create Collection
var Media = mongoose.model("media", mediaSchema);

module.exports = { Media };
