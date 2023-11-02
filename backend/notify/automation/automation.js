const Users = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const Usershistory = require("../../node/model/Usershistory");
dotenv.config();


async function  Message() {
    try{
        const currentTime = new Date(); //เวลาปัจจุบัน
    
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 9 โมงเช้า)
        const notificationTimeBreakfast = new Date(); 
        notificationTimeBreakfast.setHours(12) //เวลาทานอาหารเช้า
        notificationTimeBreakfast.setMinutes(0);


   
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 12.30 โมงเช้า)
    const notificationTimeLunch = new Date(); 
    notificationTimeLunch.setHours(13, 0, 0, 0); //เวลาทานอาหารเช้า

    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ก่อน 20.00 น.)
    const notificationTimeDinner = new Date(); 
    notificationTimeDinner.setHours(20, 0, 0, 0); //เวลาทานอาหารเช้า

   
   


    if(currentTime.getTime()==notificationTimeBreakfast.getTime()){
          sendMessageBreakfast();
    }


    if(currentTime.getTime()>=notificationTimeBreakfast.getTime() && currentTime.getTime()<=notificationTimeLunch.getTime()){
        sendMessageLunch();
  }


  if(currentTime.getTime()>notificationTimeDinner){
    sendMessageDinner();
}
 

    }
    catch(error){
        console.log("error from automation ",error) 
    }

const test =new Date(new Date().setHours(7, 0, 0, 0))
console.log("test "+test.toLocaleTimeString())

}

//send Message
async function sendMessageBreakfast() {

    //check time

    console.log("send message Breakfast")
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.and]:  [{ [Op.gte]:new Date(new Date().setHours(7, 0, 0, 0)), }, { [Op.lte]:new Date(new Date().setHours(9, 0, 0, 0))  }],
                // >
            },
        },
    });
    try {
        if(!users){
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

    if(users){
        users.forEach(async (element) => {
            const code = element.userlineid
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type": "text",
                        "text": "ทำได้ดีมาก"
                    }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                }
            })
        
          
        });
    }

    }
    catch (error) {
        console.log("error")
    }

}
  
async function sendMessageLunch() {
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.and]:  [{ [Op.gte]:new Date(new Date().setHours(13, 0, 0, 0)), }, { [Op.lte]:new Date(new Date().setHours(13,0, 0, 0))  }],
                // >
            },
        },
    });

    try {
        if(users){
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
}
    catch (error) {
        console.log("error")
    }



}

async function sendMessageDinner() {
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(0, 20, 0, 0)), // >
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
