const express = require('express');
const service = require('./line.service');
const lineRouter = express.Router();

lineRouter.post('/getTokenByLIFF',async (req, res) => {
   return await service.getCookieByLIFF(req, res);
});

lineRouter.post('/',async (req, res) => {
   return await service.login(req, res);
});

lineRouter.post('/checktoken',async (req, res) => {
   return await service.checktoken(req, res);
});

lineRouter.post('/v2',async (req, res) => {
   return await service.loginagain(req, res);
});

lineRouter.post('/members',async (req, res) => {
   return await service.getMember(req, res);
});

lineRouter.delete('/',async (req, res) => {
   return await service.clearCookie(req, res);
});

module.exports = lineRouter;