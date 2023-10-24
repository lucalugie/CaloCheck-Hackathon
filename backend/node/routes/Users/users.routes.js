const express = require('express');
const service = require('./users.service');
const userRouter = express.Router();


userRouter.post('/',async (req, res) => {
   return await service.getMember(req, res);
});



module.exports = userRouter;