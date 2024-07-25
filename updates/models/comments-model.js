const { mongoose } = require("../config/connection");
const mongoosePaginate = require('mongoose-paginate-v2');

// Create Schema 
const Schema = mongoose.Schema;
/*
let reviewsSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId, // Assuming this references another collection's ObjectId
        required: true,
        ref: 'posts' // Adjust 'posts' to the actual collection name if different
    },
    like_counts: {
        type: Number,
        default: 0
    },
    dis_like_counts: {
        type: Number,
        default: 0
    },/*
    views: {
        type: Number,
        default: 0
    }, 
    comments: [{
        text: {
            type: String,
            default: ""
        },
        counts: {
            type: Number,
            default: 0
        },
    }]
}); */


let reviewsSchema = new Schema({
    
    like_counts :{
        type: Number,
        default: 0
    },
    dis_like_counts:{
        type: Number,
        default: 0
    },
    comments: [],
    data_id : {
        type: String,
        default: ""
    },
    data_title: {
        type: String,
        default: ""
    },

});


// Apply the pagination plugin to the schema
var shmplg = reviewsSchema.plugin(mongoosePaginate);

// Create Collection
var Comments = mongoose.model("comments", shmplg);


module.exports = { Comments };