const {mongoose} = require("./../config/connection");


// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let usersSchema = new Schema({
    id: {
          type: mongoose.Schema.Types.ObjectId,
          // default: mongoose.Types.ObjectId
    },
    username:{
          type : String ,
          trim: true,
          default: ""  
    },
    firstname: {
          type : String ,
          trim: true,
          default: ""
    },
      title: {
            type : String ,
            trim: true,
            default: ""
      },
    secondname: {
          type : String ,
          trim: true,
          default: "" 
    },
    thumbnail_url:{
            type : String ,
            trim: true,
            default: "" 
      },
    password: {
          type: String ,
          trim : true
    },
    siteurl: {
          type: String ,
          trim : true,
          default: "" 
    },
    image:{	
      base64: {type: String, default: "" },
      src: {type: String, default: "" }
    },
    email: {
          type: String ,
          trim : true ,
          required:[true , "Required !"] 
    },
    rule: {
          type: Number,
          default:0, 
    } , /* Subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4 */
    about: { type : String , trim :true, default: "" },
    social_links:{
          type: [
                { 
                  social_name: { type : String , trim :true },
                  social_link: { type : String , trim :true },
                }
          ]
    },
    allow_appears_in_search_engine: {
          type: Boolean,
          default: false
    },
    send_newsletter: {
          type: Boolean,
          default: true
    },
    is_blocked: {
          type: Boolean,
          default: false
    }, 
    token: {
      type: String, 
      default: ""
    }, 
    register_date:Date,
    last_log:Date, 
});



// Create Collection
var Usr = mongoose.model("users" , usersSchema );



module.exports = {Usr};