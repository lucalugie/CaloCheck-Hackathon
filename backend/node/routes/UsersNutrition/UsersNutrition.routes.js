const express = require("express");
const service = require("./UsersNutrition.service");
const router = express.Router();

router.get("/", async (req, res) => {
  return await service.getUsersNu(req, res);
});

module.exports = router;
