const CampaignService = require("../services/CampaignService");

async function createModel (req, res){
    try {
        const Model = await CampaignService.createModel(req, res);
        res.status(200).json(Model);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function createUserCampaigns (req, res){
    try {
        const Model = await CampaignService.createUserCampaigns(req, res);
        res.status(200).json(Model);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createModel, createUserCampaigns }