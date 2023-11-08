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
    // Define the time zone as "Europe/London"
    const londonTimeZone = "Europe/London";

    const noweat = await UserNutrition.findAll({
        where: {
          updatedAt: {
            [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
          },
        },
      });
    if (noweat.length > 0) {
       //เช็คทุกการอัพเดต
       noweat.forEach((element) => {
        check(element.userlineid);
       })

    } else {
        console.log("no data")
    }

    
    
}



async function check(id) {
  const currentTime = new Date();
  const checkeverydayend = new Date();
  checkeverydayend.setHours(23); // เวลาในการเช็ค
  checkeverydayend.setMinutes(59);
  checkeverydayend.setSeconds(59);

  const checkeverydaystart = new Date();
  checkeverydaystart.setHours(checkeverydaystart.getHours() + 1); // เวลาในการเช็ค
  checkeverydaystart.setMinutes(0);
  checkeverydaystart.setSeconds(0);

  try {

      // Check if there is a notification for today
      const checkg = await goals.findOne({
        where: {
          userlineid: id
        },
      });

      const checkeat = await UserNutrition.findAll({
        where: {
          userlineid: id
        },
        updatedAt: {
          [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
        },
      });
      checkeat.forEach((element) => {
        console.log(element.userlineid)
        console.log(element.id,element.ach_kcal,(checkg.goals_kcal*2))
        if( element.ach_kcal>=(checkg.goals_kcal*2)) {
          sendMessage(element.userlineid)
        }
      })
 
    

  } catch (error) {
    console.error("error");
    
  }
}

async function sendMessage(userlineid) {
  const currentTime = new Date();
  const checkeverydayend = new Date();
  checkeverydayend.setHours(23); // เวลาในการเช็ค
  checkeverydayend.setMinutes(59);
  checkeverydayend.setSeconds(59);

  const checkeverydaystart = new Date();
  checkeverydaystart.setHours(1); // เวลาในการเช็ค
  checkeverydaystart.setMinutes(0);
  checkeverydaystart.setSeconds(0);
  const checknotiscon = await noti.findOne({
    where: {
        userid: userlineid,
        createdAt: {
          [Op.and]: [{ [Op.gte]: checkeverydaystart }, { [Op.lte]: checkeverydayend }],
        },
        morecal: 1
    },
})
    if(!checknotiscon){
      const log = await noti.create({
        userid: userlineid,
    })
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

            console.log("ss")
            } else {
              console.log("no data")
            }
          }
else{
  console.log("ส่งเตือนไปแล้ว")
    
}
}

module.exports = {
  condition,
};
