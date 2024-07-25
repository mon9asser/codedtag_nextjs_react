const {mongoose} = require("./../config/connection");
const { Helper } = require("./../config/helper")

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let CategoriesSchema = new Schema({
    
    category_name: {
        type: String, 
        trim: true,
        default: ""
    },
    
    ...Helper.defaultSchema
});



// Create Collection
var Categories = mongoose.model("categories" , CategoriesSchema );

 

module.exports = {Categories};