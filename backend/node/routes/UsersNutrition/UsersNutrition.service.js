const UsersNutrition = require('../../model/UsersNutrition');

async function getUsersNu(req, res) {
    const nutritions = await UsersNutrition.findAll();
    res.send(nutritions);
}

module.exports = {
    getUsersNu
}