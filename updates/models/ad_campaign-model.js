const { mongoose } = require("./../config/connection");

// Create Schema 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let adCampaignSchema = new Schema({
    code: {
        type: String,
        trim: true,
        default: ""
    },
    page: {
        type: String,
        trim: true,
        default: ""
    },
    is_enabled: {
        type: Boolean,
        trim: true,
        default: true
    },
    position: {
        type: String,
        trim: true,
        default: ""
    }
});

// Create Collection
var AdCampaign = mongoose.model("ad_campaign", adCampaignSchema);

module.exports = { AdCampaign };
