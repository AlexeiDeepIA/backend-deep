const { required } = require('@hapi/joi/lib/base');
const { date } = require('@hapi/joi/lib/template');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignsModel = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: '_id' 
    },
    csvFields: {
        type: Schema.Types.Mixed,
        default: {}
    }
});

const UserCampigns = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: '_id'
    },
    title: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Campaigns', CampaignsModel);
module.exports = mongoose.model('UserCampaigns', UserCampigns);