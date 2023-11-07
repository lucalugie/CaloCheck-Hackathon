const express = require("express");
const service = require('./notify.service');
const router = express.Router();

router.post("/", async (req, res) => {
  return service.check(req, res);
});


module.exports = router;