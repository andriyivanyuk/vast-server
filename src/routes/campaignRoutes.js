const Router = require("express");
const router = new Router();
const userController = require("../controllers/campaignController");

router.post("/campaign", userController.createCampaign);
router.get("/campaigns", userController.getCampaigns);
router.get("/campaign/:id", userController.getOneCampaign);
router.put("/campaign/:id", userController.updateCampaign);
router.delete("/campaign/:id", userController.deleteCampaign);

module.exports = router;
