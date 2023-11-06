const Foodnutrition = require("../../model/foodnutrition");
const { Op } = require("sequelize");

async function sendFoodnu(req, res) {
  const foods = await Foodnutrition.findAll();
  res.send(foods);
}

async function searchmenu(req, res) {
  try {
    const nameToSearch = req.query.name;
    const food = await Foodnutrition.findAll({
      where: {
        name: {
          [Op.like]: `%${nameToSearch}%`,
        },
      },
    });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    console.error(error);
  }
}

async function findFoodnu(req, res) {
  const food = await Foodnutrition.findOne({
    where: {
      idfood: req.params.idfood,
    },
  });
  res.json(food);
}

//lugie modify****
async function createFoodnu(req, res) {
  try {
    const {
      name,
      per_items,
      kcal,
      carb,
      per_carb,
      per_fat,
      protein,
      per_protein,
      veg,
      per_veg,
      per_sugar,
      per_salt,
    } = req.body;

    const food = await Foodnutrition.create({
      name,
      per_items,
      kcal,
      carb,
      per_carb,
      per_fat,
      protein,
      per_protein,
      veg,
      per_veg,
      per_sugar,
      per_salt,
    });
    if (!food) {
      throw new Error("Failed to create food");
    }

    console.log("Created Food:", food);

    res.status(201).json(food);
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ error: "Failed to create food" });
  }
}

//Pimadd
async function getByIDFood(req, res) {
  try {
    const idfood = req.query.idfood;
    const food = await Foodnutrition.findAll({
      where: {
        idfood: idfood,
      },
    });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    console.error(error);
  }
}

async function getFoodBysku(req, res) {
  try {
    const sku = req.query.sku;
    const food = await Foodnutrition.findAll({
      where: {
        sku,
      },
    });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: "food not found" });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendFoodnu,
  searchmenu,
  findFoodnu,
  createFoodnu,
  getByIDFood,
  getFoodBysku,
};
