const Foodnutrition = require('../models/Foodnutrition');

async function sendFoodnu(req, res) {
    const foods = await Foodnutrition.findAll();
    res.send(foods);
}

module.exports = {
    sendFoodnu
}