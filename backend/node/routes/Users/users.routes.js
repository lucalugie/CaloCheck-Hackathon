const express = require('express');
const service = require('./users.service');
const userRouter = express.Router();


userRouter.post('/',async (req, res) => {
   return await service.getMember(req, res);
});

userRouter.put('/PersonalInformations',async (req, res) => {
   return await service.addInfo(req, res);
});

userRouter.get('/PersonalInformations',async (req, res) => {
   return await service.getInfo(req, res);
});

module.exports = userRouter;