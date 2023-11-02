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
        notificationTimeBreakfast.setHours(17) //เวลาทานอาหารเช้า
        notificationTimeBreakfast.setMinutes(28);
        notificationTimeBreakfast.setSeconds(10);

   
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 12.30 โมงเช้า)
    const notificationTimeLunch = new Date(); 
    notificationTimeLunch.setHours(13) //เวลาทานอาหารเช้า
    notificationTimeLunch.setMinutes(0);
    notificationTimeLunch.setSeconds(0);

    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ก่อน 20.00 น.)
    const notificationTimeDinner = new Date(); 
    notificationTimeDinner.setHours(20) //เวลาทานอาหารเช้า
    notificationTimeDinner.setMinutes(0);
    notificationTimeDinner.setSeconds(0);

   
   


    if(currentTime.getTime()==notificationTimeBreakfast.getTime()){
        console.log("send message Breakfast")
          sendMessageBreakfast();
    }


    if(currentTime.getTime()==notificationTimeBreakfast.getTime()){
        // sendMessageLunch();
  }


  if(currentTime.getTime()>notificationTimeDinner.getTime){
    // sendMessageDinner();
}
 

    }
    catch(error){
        console.log("error from automation ",error) 
    }



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

    const noti = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.notIn]:  users.map(user => user.userlineid),
                // >
            },
        },
    });

    try {
        if(noti){
        users.forEach(async (element) => {
            const code = element
            console.log(code)
            // const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
            //     to: code,
            //     messages: [
            //         {
            //             "type":"text",
            //             "text":"คุณทานมื้อเช้ารึยัง"
            //         },
            //         {
            //             "type":"image",
            //             "originalContentUrl": "https://yungying.com/images/preme/1.png",
            //             "previewImageUrl": "https://yungying.com/images/preme/1.png"
            //         }
            //     ]
            // }, {
            //     headers: {
            //         "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
            //     }
            // })
        
          
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
                        "type":"text",
                        "text":"อย่าลืมทานมื้อเที่ยง"
                    },
                    {
                        "type":"image",
                        "originalContentUrl": "https://yungying.com/images/preme/2.png",
                        "previewImageUrl": "https://yungying.com/images/preme/2.png"
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
