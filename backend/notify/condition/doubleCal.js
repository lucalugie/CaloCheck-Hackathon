const noti = require("../../node/model/noti");
const { Op } = require("sequelize");
const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../node/model/User');
const UserNutrition = require('../../node/model/UsersNutrition');
const goals = require('../../node/model/UsersGoals');

dotenv.config();


async function condition() {
    const currentTime = new Date();
    const checkeverydayend = new Date();
    checkeverydayend.setHours(23); // เวลาในการเช็ค
    checkeverydayend.setMinutes(59);
    checkeverydayend.setSeconds(59);
  
    const checkeverydaystart = new Date();
    checkeverydaystart.setHours(1); // เวลาในการเช็ค
    checkeverydaystart.setMinutes(0);
    checkeverydaystart.setSeconds(0);
    const noweat = await UserNutrition.findAll({
        where: {
          createdAt: {
            [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
          },
        },
      });
    if (noweat.length > 0) {
        console.log(noweat)
    } else {
        console.log("no data")
    }

    
    
}



async function check(req, res) {
  const currentTime = new Date();
  const checkeverydayend = new Date();
  checkeverydayend.setHours(23); // เวลาในการเช็ค
  checkeverydayend.setMinutes(59);
  checkeverydayend.setSeconds(59);

  const checkeverydaystart = new Date();
  checkeverydaystart.setHours(1); // เวลาในการเช็ค
  checkeverydaystart.setMinutes(0);
  checkeverydaystart.setSeconds(0);

  try {


      if (!member) {
        return res.status(404).json({ status: "Failed", message: "User not found" });
      }

      const userlineid = decoded.userId;

      // Check if there is a notification for today
      const checknoti = await noti.findOne({
        where: {
          userid: userlineid,
          createdAt: {
            [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
          },
        },
      });

      // If no notification exists, create one
      if (!checknoti) {
        await noti.create({
          userid: userlineid,
          createdAt: new Date(),
        });
      } else {
        // Check if morecal is 1
        if (checknoti.morecal === 1) {
          return res.status(201).json("เคยส่งเเล้ว");
        } else {
          // Send a message and update morecal to 1
          sendMessage(userlineid, res);
        }
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed", message: "Internal server error" });
  }
}

async function sendMessage(userlineid, res) {
    const currentTime = new Date();
    const checkeverydayend = new Date();
    checkeverydayend.setHours(23); // เวลาในการเช็ค
    checkeverydayend.setMinutes(59);
    checkeverydayend.setSeconds(59);
  
    const checkeverydaystart = new Date();
    checkeverydaystart.setHours(1); // เวลาในการเช็ค
    checkeverydaystart.setMinutes(0);
    checkeverydaystart.setSeconds(0);
  const token = await axios.post(
    `https://api.line.me/v2/bot/message/push`,
    {
      to: userlineid,
      messages: [
        {
          type: "text",
          text: "กินเเคลเกินไป 2 เท่า เเล้วนะ (●o≧д≦)o",
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`,
      },
    }
  );

  if (token) {
    console.log(token.data);
    // Update morecal to 1 in the database
    await noti.update(
      {
        morecal: 1,
      },
      {
        where: {
          userid: userlineid,
          createdAt: {
            [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
          },
        },
      }
    );

    return res.status(201).json("success 1");
  } else {
    return res.status(500).json("Failed to send the message");
  }
}

module.exports = {
  condition,
};
