const express = require('express');
const service = require('./ig.service');
const igRouter = express.Router();

igRouter.get('/photostorys/:name',async (req, res) => {
   return await service.getphotostoryFromIG(req, res);
});
module.exports = igRouter;