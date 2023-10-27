const express = require('express');
const service = require('./foodnutrition.service')
const router = express.Router();

router.get('/', async (req, res) => {
    return service.sendFoodnu(req, res)
  });

router.get('/search', (req, res) => {
    return service.searchmenu(req, res);
});
  
  module.exports = router;
  