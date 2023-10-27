const UsersNutrition = require("../../model/UsersNutrition");

async function getUsersNu(req, res) {
  const nutritions = await UsersNutrition.findAll();
  res.send(nutritions);
}

async function postUsersNu(req, res) {
  const {
    goals,
    achieve,
    goals_protein,
    goals_fat,
    goals_salt,
    goals_sugar,
    goals_veg,
    goals_carb,
    ach_protein,
    ach_fat,
    ach_salt,
    ach_sugar,
    ach_veg,
    ach_carb,
    ach_cal,
    userlineid,
  } = req.body;

  const nutrition = await UsersNutrition.create({
    goals,
    achieve,
    goals_protein,
    goals_fat,
    goals_salt,
    goals_sugar,
    goals_veg,
    goals_carb,
    ach_protein,
    ach_fat,
    ach_salt,
    ach_sugar,
    ach_veg,
    ach_carb,
    ach_cal,
    userlineid,
  });

  res.json(nutrition);
}

async function putUsersNu(req, res) {
  const {
    goals,
    achieve,
    goals_protein,
    goals_fat,
    goals_salt,
    goals_sugar,
    goals_veg,
    goals_carb,
    ach_protein,
    ach_fat,
    ach_salt,
    ach_sugar,
    ach_veg,
    ach_carb,
    ach_cal,
    userlineid,
  } = req.body;

  const nutrition = await UsersNutrition.findOne({
    where: {
      id: req.params.id,
    },
  });

  nutrition.goals = goals;
  nutrition.achieve = achieve;
  nutrition.goals_protein = goals_protein;
  nutrition.goals_fat = goals_fat;
  nutrition.goals_salt = goals_salt;
  nutrition.goals_sugar = goals_sugar;
  nutrition.goals_veg = goals_veg;
  nutrition.goals_carb = goals_carb;
  nutrition.ach_protein = ach_protein;
  nutrition.ach_fat = ach_fat;
  nutrition.ach_salt = ach_salt;
  nutrition.ach_sugar = ach_sugar;
  nutrition.ach_veg = ach_veg;
  nutrition.ach_carb = ach_carb;
  nutrition.ach_cal = ach_cal;
  nutrition.userlineid = userlineid;

  await nutrition.save();
  res.json(nutrition);
}

module.exports = {
  getUsersNu,
  postUsersNu,
  putUsersNu,
};

//   goals,
//   achieve,
//   goals_protein,
//   goals_fat,
//   goals_salt,
//   goals_sugar,
//   goals_veg,
//   goals_carb,
//   ach_protein,
//   ach_fat,
//   ach_salt,
//   ach_sugar,
//   ach_veg,
//   ach_carb,
//   ach_cal,
//   userlineid
