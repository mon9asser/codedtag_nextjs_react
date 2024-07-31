const { mongoose } = require("./../config/connection");
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema 
const Schema = mongoose.Schema;

let redirectSchema = new Schema({
    from: { 
        type: String,
        trim: true,
        required: true
    },
    to: { 
        type: String,
        trim: true,
        required: true
    },
    redirectType: { 
        type: String,
        trim: true,
        required: true,
        enum: ['301', '302']  
    },
    isFolder: { 
        type: Boolean,
        default: false
    },
    dateCreated: { 
        type: Date,
        default: Date.now
    }
});

// Apply the pagination plugin to the schema
redirectSchema.plugin(mongoosePaginate);

// Create Collection
var Redirect = mongoose.model("redirects", redirectSchema);

module.exports = { Redirect };
