const express = require('express');
const service = require('./line.service');
const lineRouter = express.Router();


lineRouter.post('/',async (req, res) => {
   return await service.login(req, res);
});
lineRouter.post('/members',async (req, res) => {
   return await service.getMember(req, res);
});


module.exports = lineRouter;