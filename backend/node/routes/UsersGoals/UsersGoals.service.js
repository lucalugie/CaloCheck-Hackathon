const UsersGoals = require("../../model/UsersGoals");
const Users = require("../../model/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

//get
async function getUsersGo(req, res) {
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

        console.log("decoded from usergoals", decoded.userId);

        const member = await UsersGoals.findOne({
          where: {
            userlineId: decoded.userId,
          },
        });

        if (!member) {
          return res
            .status(404)
            .json({ status: "Failed", message: "User not found" });
        }
        return res.status(201).json(member);
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
async function postUsersGo(req, res) {
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

        console.log("decoded from usergoals", decoded.userId);

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
          goals_kcal,
          goals_g,
          goals_protein,
          goals_fat,
          goals_salt,
          goals_sugar,
          goals_veg,
          goals_carb,
        } = req.body;

        const goals = await UsersGoals.create({
          userlineid,
          goals_kcal,
          goals_g,
          goals_protein,
          goals_fat,
          goals_salt,
          goals_sugar,
          goals_veg,
          goals_carb,
        });

        return res.status(201).json(goals);
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
}

//put
async function putUsersGo(req, res) {
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
          goals_kcal,
          goals_g,
          goals_protein,
          goals_fat,
          goals_salt,
          goals_sugar,
          goals_veg,
          goals_carb,
        } = req.body;

        const goals = await UsersGoals.findOne({
          where: {
            userlineid: userlineid,
          },
        });
        if (goals) {
          goals.goals_kcal = goals_kcal;
          goals.goals_g = goals_g;
          goals.goals_protein = goals_protein;
          goals.goals_fat = goals_fat;
          goals.goals_salt = goals_salt;
          goals.goals_sugar = goals_sugar;
          goals.goals_veg = goals_veg;
          goals.goals_carb = goals_carb;
          await goals.save();
          return res.status(201).json(goals);
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
  getUsersGo,
  postUsersGo,
  putUsersGo,
};

//   userlineid
//   goals_kcal
//   goals_g
//   goals_protein
//   goals_fat
//   goals_salt
//   goals_sugar
//   goals_veg
//   goals_carb
