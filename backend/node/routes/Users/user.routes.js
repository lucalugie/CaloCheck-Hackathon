const express = require('express');
const service = require('./user.service');
const userRouter = express.Router();


userRouter.post('/',async (req, res) => {
   return await service.postCode(req, res);

});

module.exports = userRouter;