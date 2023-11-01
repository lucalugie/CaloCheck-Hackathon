const express = require("express");
const service = require("./UsersGoals.service");
const router = express.Router();

router.get("/", async (req, res) => {
  return await service.getUsersGo(req, res);
});

router.post("/goalsdefault", async (req, res) => {
  return await service.postUsersGo(req, res);
});

router.put("/updategoals", async (req, res) => {
  return await service.putUsersGo(req, res);
});

module.exports = router;
