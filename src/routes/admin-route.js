const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/:userId", adminController.getDataByUserId);
module.exports = router;
