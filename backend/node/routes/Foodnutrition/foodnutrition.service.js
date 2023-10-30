const Foodnutrition = require('../../model/foodnutrition');
const { Op } = require("sequelize");
async function sendFoodnu(req, res) {
    const foods = await Foodnutrition.findAll();
    res.send(foods);
}

async function searchmenu(req, res) {
try{
const nameToSearch = req.query.name;
  const food = await Foodnutrition.findAll({
    where: {
      name: {
        [Op.like]: `%${nameToSearch}%`
      }
    }
  });
  if (food) {
    res.status(200).json(food); 
  } else {
    res.status(404).json({ message: "food not found" });
  }
}
catch (error) {
  console.error(error);
}
}

//Pimadd
async function getByIDFood(req, res) {
  try{
  const idfood = req.query.idfood;
    const food = await Foodnutrition.findAll({
      where: {
        idfood: idfood
      }
    });
    if (food) {
      res.status(200).json(food); 
    } else {
      res.status(404).json({ message: "food not found" });
    }
  }
  catch (error) {
    console.error(error);
  }
  }

  async function getFoodBysku(req, res) {
    try{
    const sku = req.query.sku;
      const food = await Foodnutrition.findAll({
        where: {
          sku
        }
      });
      if (food) {
        res.status(200).json(food); 
      } else {
        res.status(404).json({ message: "food not found" });
      }
    }
    catch (error) {
      console.error(error);
    }
    }


module.exports = {
    sendFoodnu,
    searchmenu,
    getByIDFood,
    getFoodBysku
}