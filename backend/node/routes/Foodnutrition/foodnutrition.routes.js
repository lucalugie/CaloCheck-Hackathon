const express = require('express');
const service = require('./foodnutrition.service')
const router = express.Router();

router.get('/', async (req, res) => {
    return service.sendFoodnu(req, res)
  });

router.get('/search', (req, res) => {
    return service.searchmenu(req, res);
});

router.get('/foods', (req, res) => {
  return service.getByIDFood(req, res);
});

router.get('/barcode', (req, res) => {
  return service.getFoodBysku(req, res);
});
  module.exports = router;
  