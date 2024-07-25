const { mongoose } = require("./../config/connection");
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema 
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    name: { 
        type: String,
        trim: true,
        required: true
    },
    email: { 
        type: String,
        trim: true,
        required: true
    },
    subject: { 
        type: String,
        trim: true,
        default: ""
    },
    date: { 
        type: Date,
        default: Date.now
    },
    message: { 
        type: String,
        trim: true,
        required: true
    }
});

// Apply the pagination plugin to the schema
contactSchema.plugin(mongoosePaginate);

// Create Collection
var Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact };
