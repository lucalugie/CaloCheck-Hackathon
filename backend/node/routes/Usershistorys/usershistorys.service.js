const Usershistory = require("../../model/Usershistory");
const Foodnutrition = require("../../model/foodnutrition");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
//lugie
const Users = require("../../model/User");

async function getFoodByDate(req, res) {
  const dateParam = req.query.createdAt;

  if (!req.cookies.token) {
    return res.status(400).json({
      status: "Failed",
      message: "No data",
    });
  }

  console.log(dateParam);

  try {
    jwt.verify(
      req.cookies.token,
      process.env.PRIVATE_KEY,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            status: "Failed",
            message: err.message,
          });
        }

        const userId = decoded.userId; // Assuming you have a userId in the token payload

        try {
          console.log(dateParam);
          const food = await Usershistory.findAll({
            where: {
              userlineId: userId,
              createdAt: {
                [Op.and]: [
                  { [Op.gte]: dateParam + " 00:00:00" },
                  { [Op.lte]: dateParam + " 23:59:59" },
                ],
              },
            },
          });
          console.log("food", food);
          if (food.length > 0) {
            res.status(200).json(food);
          } else {
            res
              .status(404)
              .json({ message: "Food not found for the given date" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//lugie modify****
async function postUserHistory(req, res) {
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

        console.log("decoded from userHistory", decoded.userId);

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
        const { idfood } = req.body;

        const history = await Usershistory.create({
          userlineid,
          idfood,
        });

        return res.status(201).json(history);
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
  getFoodByDate,
  postUserHistory, //lugie modify****
};
