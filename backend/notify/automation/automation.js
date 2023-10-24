const Novels = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();


async function Message() {


      //ตั้งเวลาส่งข้อความที่กำหนด (อาหารเช้า)
      const targetTimeBreakfast = new Date();
      targetTimeBreakfast.setDate(targetTimeBreakfast.getDate()); // เพิ่ม 1 วัน
      targetTimeBreakfast.setHours(18,38, 0, 0); // ตั้งเวลาเที่ยงคืน
      const currentTimeBreakfast = new Date();
      
      const delayBreakfast = targetTimeBreakfast - currentTimeBreakfast;
      setTimeout(sendMessageBreakfast, delayBreakfast);


      //ตั้งเวลาส่งข้อความที่กำหนด (อาหารเที่ยง)
      const targetTimeLunch = new Date();
      targetTimeLunch.setDate(targetTimeLunch.getDate()); // เพิ่ม 1 วัน
      targetTimeLunch.setHours(12,30, 0, 0); // ตั้งเวลาเที่ยงคืน
      const currentTimeLunch = new Date();
      
      const delayLunch = targetTimeLunch - currentTimeLunch;
      setTimeout(sendMessageLunch, delayLunch);


      //ตั้งเวลาส่งข้อความที่กำหนด (อาหารเย็น)
      const targetTimeDinner = new Date();
      targetTimeDinner.setDate(targetTimeDinner.getDate()); // เพิ่ม 1 วัน
      targetTimeDinner.setHours(19,0, 0, 0); // ตั้งเวลาเที่ยงคืน
      const currentTimeDinner = new Date();
      
      const delayDinner = targetTimeDinner - currentTimeDinner;
      setTimeout(sendMessageDinner, delayDinner);

}

//send Message
async function sendMessageBreakfast() {
    const novel = await Novels.findAll();
    try {
        novel.forEach(async (element) => {
            const code = element.userlineId
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type": "text",
                        "text": "แดกอาหารเช้าซะ"
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
    const novel = await Novels.findAll();


}

async function sendMessageDinner() {
    const novel = await Novels.findAll();


}
module.exports = {
    Message,

}
