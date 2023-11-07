const noti = require("../../model/noti");
const { Op } = require("sequelize");
const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const jwt = require('jsonwebtoken');
dotenv.config();

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
    if (!req.cookies.token) {
      console.log("No token");
      return res.status(400).json({
        status: "Failed",
        message: "No data",
      });
    }

    jwt.verify(req.cookies.token, process.env.PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ status: "Failed", message: "Unauthorized" });
      }

      const member = await Users.findOne({
        where: {
          userlineId: decoded.userId,
        },
      });

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
    });
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
  check,
};
