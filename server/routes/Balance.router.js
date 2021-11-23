const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/Balance.controller");

router.post("/", balanceController.create);
router.get("/", balanceController.find);
router.get("/:id", balanceController.findOne);
router.put("/:id", balanceController.update);
router.delete("/:id", balanceController.remove);

module.exports = router;