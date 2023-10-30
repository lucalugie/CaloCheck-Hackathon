const express = require("express");
const service = require("./UsersNutrition.service");
const router = express.Router();

router.get("/byusersid", async (req, res) => {
  return await service.getUsersNu(req, res);
});

router.get("/bydate", async (req, res) => {
  return await service.getUsersNuBydate(req, res);
});

router.get("/bytodaydate", async (req, res) => {
  return await service.getUsersNuByTodaydate(req, res);
});

router.post("/", async (req, res) => {
  return await service.postUsersNu(req, res);
});

router.put("/bydate", async (req, res) => {
  return await service.putUsersNu(req, res);
});

module.exports = router;
