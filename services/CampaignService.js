const CampaignModel = require("../models/CampaignModel");
const UserCampaigns = require("../models/CampaignModel");

async function createUserCampaigns(req){
    try {
        const Campaigns = new UserCampaigns({
            userId: req.body.userId,
            title: req.body.title,
            date: req.body.date
        })
        
        await Campaigns.save();
        
        if(Campaigns){
            return {
                success: true,
                message: 'Campaign created!',                
            }
        } else {
            return {
                success: false,
                message: 'Cant create',                
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Internal server error!',
            error: error.message
        }
    }
}


async function createModel(req, res){
    try {
        const Model = new CampaignModel({
            userId: req.body.userId,
            csvFields: req.body.csvFields
        });
        await Model.save();

        if(Model) {
            return {
                success: true,
                message: "Data saved!",
                data: Model
            }
        } else {
            return {
                success: false,
                message: "Failed to save data!"
            }
        }               
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

module.exports = { createModel, createUserCampaigns };