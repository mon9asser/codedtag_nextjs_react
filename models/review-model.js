const { mongoose } = require("./../config/connection");

// Create Schema 
const Schema = mongoose.Schema;

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
    }
});

// Create Collection
var Reviews = mongoose.model("reviews", reviewsSchema);

module.exports = { Reviews };