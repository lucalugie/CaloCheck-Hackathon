const Foodnutrition = require('../../model/foodnutrition');

async function sendFoodnu(req, res) {
    const foods = await Foodnutrition.findAll();
    res.send(foods);
}

module.exports = {
    sendFoodnu
}