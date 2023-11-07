const UsersNutrition = require("../../model/UsersNutrition");
const Users = require("../../model/User");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

//get all by usersid
async function getUsersNu(req, res) {
  try {
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ status: "Failed", message: "Unauthorized" });
        }

        console.log("decoded from userNutrition", decoded.userId);

        const userlineid = decoded.userId;

        // Get all usernutrition records for the same user
        const usernutritions = await UsersNutrition.findAll({
          where: {
            userlineid: userlineid,
          },
        });

        return res.status(200).json(usernutritions);
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

//get by date
async function getUsersNuBydate(req, res) {
  //lugie modify
  const dateParam = req.query.createdAt;

  try {
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ status: "Failed", message: "Unauthorized" });
        }

        console.log("decoded from userNutrition", decoded.userId);
        console.log("dateParam from userNutrition",dateParam);

        const userlineid = decoded.userId;
  
        //lugie modify
        const usernutritions = await UsersNutrition.findOne({
          where: {
            userlineid: userlineid,
            createdAt: {
              [Op.and]: [
                { [Op.gte]: dateParam + " 00:00:00" },
                { [Op.lte]: dateParam + " 23:59:59" },
              ],
            },
          },
        });

        return res.status(200).json(usernutritions);
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

//get by today date
async function getUsersNuByTodaydate(req, res) {
  try {
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ status: "Failed", message: "Unauthorized" });
        }

        console.log("decoded from userNutrition", decoded.userId);

        const userlineid = decoded.userId;
        //date from today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const usernutritions = await UsersNutrition.findOne({
          where: {
            userlineid: userlineid,
            createdAt: {
              [Op.gte]: todayStart,
              [Op.lte]: todayEnd,
            },
          },
        });

        return res.status(200).json(usernutritions);
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

//post
async function postUsersNu(req, res) {
  try {
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ status: "Failed", message: "Unauthorized" });
        }

        console.log("decoded from userNutritions", decoded.userId);

        const userlineid = decoded.userId;

        const {
          ach_kcal,
          ach_g,
          ach_protein,
          ach_fat,
          ach_salt,
          ach_sugar,
          ach_veg,
          ach_carb,
        } = req.body;

        const nutrition = await UsersNutrition.create({
          userlineid,
          ach_kcal,
          ach_g,
          ach_protein,
          ach_fat,
          ach_salt,
          ach_sugar,
          ach_veg,
          ach_carb,
        });

        return res.status(201).json(nutrition);
      }
    );
  } catch (error) {
    console.error("Error in postUsersNu:", error);
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

//update by date
async function putUsersNu(req, res) {
  try {
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res
            .status(401)
            .json({ status: "Failed", message: "Unauthorized" });
        }

        console.log("decoded from userNutrition", decoded.userId);

        const member = await Users.findOne({
          where: {
            userlineId: decoded.userId,
          },
        });

        if (!member) {
          return res
            .status(404)
            .json({ status: "Failed", message: "User not found" });
        }
        const userlineid = decoded.userId;
        const {
          ach_kcal,
          ach_g,
          ach_protein,
          ach_fat,
          ach_salt,
          ach_sugar,
          ach_veg,
          ach_carb,
        } = req.body;

        //the current day
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // End of the day

        const nutrition = await UsersNutrition.findOne({
          where: {
            userlineid: userlineid,
            createdAt: {
              [Op.gte]: today,
              [Op.lte]: endOfDay,
            },
          },
        });
        if (nutrition) {
          nutrition.userlineid = userlineid;
          nutrition.ach_kcal = ach_kcal;
          nutrition.ach_g = ach_g;
          nutrition.ach_protein = ach_protein;
          nutrition.ach_fat = ach_fat;
          nutrition.ach_salt = ach_salt;
          nutrition.ach_sugar = ach_sugar;
          nutrition.ach_veg = ach_veg;
          nutrition.ach_carb = ach_carb;
          await nutrition.save();
          return res.status(201).json(nutrition);
        } else {
          return res.status(404).json({
            status: "Failed",
            message: "Nutrition record not found for the specified date",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

module.exports = {
  getUsersNu,
  getUsersNuBydate,
  getUsersNuByTodaydate,
  postUsersNu,
  putUsersNu,
};

// userlineid
// ach_kcal
// ach_g:
// ach_protein
// ach_fat
// ach_salt
// ach_sugar
// ach_veg
// ach_carb
