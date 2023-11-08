const User = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const Usershistory = require("../../node/model/Usershistory");
dotenv.config();

async function MessageAutoMonth() {
    const currentTime = new Date(); 
    const checkeveryday = new Date(); 
    checkeveryday.setHours(17) //เวลาในการเช็ค
    checkeveryday.setMinutes(31);
    checkeveryday.setSeconds(10);


    if(currentTime.getTime()==checkeveryday.getTime()){
        Message()
    }
 
}
async function Message() {
    /******รวมฟังก์ชั้นส่งข้อความ*************/
    async function sendMessageMNA(code) {
        console.log("แบบทดสอบประเมินภาวะทุนโภชนาการ")
        const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                    to: code,
                    messages: [
                        {
                            "type": "text",
                            "text": "เช็คร่างกายหน่อยไหม? ครบ3เดือนเเล้วนะ!!"
                        },
                        {
                            "type":"text",
                            "text": "https://forms.gle/3u2wLxkdisSsZHd69",
                            
                        },
    
                    ]
                }, {
                    headers: {
                        "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                    }
                })
    }

    async function sendMessageNormal(code) {
        console.log("แบบทดสอบประเมินภาวะทุนโภชนาการ")
        const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
            to: code,
            messages: [
                {
                    "type": "text",
                    "text": "เช็คร่างกายหน่อยไหม? ครบ3เดือนเเล้วนะ!!"
                },
                {
                    "type": "text",
                    "text": "https://forms.gle/PmZunWSHHEtEBJtUA"
                },
                
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
            }
        })
    }
    /***************นับเวลา 3 เดือน********************/

    
    


    // ลด 3 เดือน
    var threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth()-3 )
    threeMonthsLater.setHours(0)
    threeMonthsLater.setMinutes(0)
    threeMonthsLater.setSeconds(0)

    var threeMonthsLaterend = new Date();
    threeMonthsLaterend.setMonth(threeMonthsLaterend.getMonth()-3 )
    threeMonthsLaterend.setHours(23)
    threeMonthsLaterend.setMinutes(59)
    threeMonthsLaterend.setSeconds(59)
    
    console.log(threeMonthsLater)
    const users = await User.findAll({
        where: {
            createdAt:{
                [Op.and]: [{ [Op.gte]: threeMonthsLater }, { [Op.lte]: threeMonthsLaterend  }],
            }
        },
    });
    
// console.log(users[0].dataValues.userlineId)

        users.forEach(async (user) => {
            if(user.age>70){
                sendMessageMNA(user.userlineId)
            }
            else{
                sendMessageNormal(user.userlineId);
            }
        })



}
module.exports = {
    MessageAutoMonth,

}
