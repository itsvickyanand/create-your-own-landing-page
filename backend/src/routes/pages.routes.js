const express = require("express");
const router = express.Router();
const controller = require("../controllers/pages.controller");

router.post("/", controller.create);
router.get("/", controller.getAll); // ?projectId=
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
