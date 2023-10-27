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

async function findFoodnu (req, res){
    const food = await Foodnutrition.findOne({
        where: {
          idfood: req.params.idfood
        }
      });
      res.json(food);
}

async function createFoodnu (req, res){
    const { name, per_items, cal, carb, per_carb, per_fat, protein, per_protein, veg, per_veg, per_sugar,per_salt } = req.body;
    const food = await Foodnutrition.create({ 
      name,
      per_items,
      cal,
      carb,
      per_carb,
      per_fat,
      protein,
      per_protein,
      veg,
      per_veg,
      per_sugar,
      per_salt
    });
    res.json(food);
}



module.exports = {
    sendFoodnu,
    searchmenu,
    findFoodnu,
    createFoodnu
    
}