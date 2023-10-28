const express = require('express');
const service = require('./usershistorys.service');
const userRouter = express.Router();


userRouter.get('/foods',async (req, res) => {
   return await service.getFoodByDate(req, res);
});



module.exports = userRouter;