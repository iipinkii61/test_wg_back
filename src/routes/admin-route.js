const express = require("express");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/", adminController.getAllUser);
router.delete("/:userId", adminController.deleteUser);
module.exports = router;
