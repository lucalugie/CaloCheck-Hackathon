const express = require("express");
const service = require("./UsersNutrition.service");
const router = express.Router();

router.get("/", async (req, res) => {
  return await service.getUsersNu(req, res);
});

router.post("/", async (req, res) => {
  return await service.postUsersNu(req, res);
});

router.put("/:id", async (req, res) => {
  return await service.putUsersNu(req, res);
});

module.exports = router;
