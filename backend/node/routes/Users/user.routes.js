const express = require('express');
const service = require('./user.service');
const userRouter = express.Router();


userRouter.get ('/',async (req, res) => {
   return await service.postCode(req, res);

});

module.exports = userRouter;