const express = require("express");
const dataController = require("../controllers/data-controller");

const router = express.Router();

router.get("/", dataController.getMyData);
router.post("/add", dataController.createData);
router.delete("/:dataId", dataController.deleteData);
router.patch("/:dataId", dataController.updateData);

module.exports = router;
