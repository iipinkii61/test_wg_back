const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/", adminController.getAllUser);
router.get("/allData", adminController.getAllData);
router.delete("/:userId", adminController.deleteUser);
module.exports = router;
