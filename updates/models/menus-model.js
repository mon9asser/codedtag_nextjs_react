const { mongoose } = require("./../config/connection");

// Create Schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let subitemSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    link: {
        type: String,
        trim: true,
        default: ""
    },
    openInNewTab: {
        type: Boolean,
        default: false,
    },
});

let menuSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    link: {
        type: String,
        trim: true,
        default: ""
    },
    openInNewTab: {
        type: Boolean,
        default: false,
    },
    menu_name: {
        default: "",
        type: String
    },
    subitems: [subitemSchema], // Nested subitems array
});

// Create Collection
var Menus = mongoose.model("menus", menuSchema);

module.exports = { Menus };
