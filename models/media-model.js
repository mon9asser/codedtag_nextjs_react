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
    createdAt: {
        type: Date,
        default: Date.now,
    },

});
 

// Create Collection
var Media = mongoose.model("media", mediaSchema);

module.exports = { Media };
