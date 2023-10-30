const Users = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const Usershistory = require("../../node/model/Usershistory");
dotenv.config();


async function Message() {
    try{
        const currentTime = new Date(); //เวลาปัจจุบัน
    
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 9 โมงเช้า)
        const notificationTimeBreakfast = new Date(); 
        notificationTimeBreakfast.setHours(9, 0, 0, 0); //เวลาทานอาหารเช้า

   
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 12.30 โมงเช้า)
    const notificationTimeLunch = new Date(); 
    notificationTimeLunch.setHours(13, 0, 0, 0); //เวลาทานอาหารเช้า

    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ก่อน 20.00 น.)
    const notificationTimeDinner = new Date(); 
    notificationTimeDinner.setHours(20, 0, 0, 0); //เวลาทานอาหารเช้า

  
    setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= notificationTimeBreakfast) {  //เช็คทุก 9.00 น.ของทุกวัน
          sendMessageBreakfast();
        }
      },24 * 60 * 60 * 1000);


    setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= notificationTimeLunch) {      //เช็คทุก 19.00 น.ของทุกวัน
            sendMessageLunch();
        }
      },24 * 60 * 60 * 1000);
 
    
      setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= notificationTimeDinner) {    //เช็คทุก 20.00 น.ของทุกวัน
            sendMessageDinner();
        }
      },24 * 60 * 60 * 1000);





    }
    catch(error){
        console.log("error from automation") 
    }




}

//send Message
async function sendMessageBreakfast() {
    console.log("send message Breakfast")
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(1, 0, 0, 0)), // >
            },
        },
    });
    try {
        users.forEach(async (element) => {
            const code = element.userlineid
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type": "text",
                        "text": "คุณทานอาหารเช้าเเล้วรึยัง"
                    }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                }
            })
        
          
        });
    }
    catch (error) {
        console.log("error")
    }

}
  
async function sendMessageLunch() {
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(1, 0, 0, 0)), // >
            },
        },
    });
    try {
        users.forEach(async (element) => {
            const code = element.userlineid
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type": "text",
                        "text": "คุณทานอาหารกลางวันเเล้วรึยัง"
                    }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                }
            })
        
          
        });
    }
    catch (error) {
        console.log("error")
    }



}

async function sendMessageDinner() {
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(1, 0, 0, 0)), // >
            },
        },
    });
    try {
        users.forEach(async (element) => {
            const code = element.userlineid
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type": "text",
                        "text": "คุณทานอาหารเย็นเเล้วรึยัง"
                    }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                }
            })
        
          
        });
    }
    catch (error) {
        console.log("error")
    }



}
module.exports = {
    Message,

}
