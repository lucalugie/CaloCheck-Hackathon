const express = require("express");
const service = require("./usershistorys.service");
const userRouter = express.Router();

userRouter.get("/foods", async (req, res) => {
  return await service.getFoodByDate(req, res);
});

//lugie modify****
userRouter.post("/history", async (req, res) => {
  return await service.postUserHistory(req, res);
});

module.exports = userRouter;
