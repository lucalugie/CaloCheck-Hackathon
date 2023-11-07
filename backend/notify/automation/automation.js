const Users = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const Usershistory = require("../../node/model/Usershistory");
const noti = require("../../node/model/noti");
dotenv.config();



async function  Message() {
    try{
        const currentTime = new Date(); //เวลาปัจจุบัน
    
    // ตั้งเวลาที่ต้องการเริ่มแจ้งเตือน (ในตัวอย่างเป็น 9 โมงเช้า)
        const notificationTimeBreakfast = new Date(); 
        notificationTimeBreakfast.setHours(9) //เวลาทานอาหารเช้า
        notificationTimeBreakfast.setMinutes(1);
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
        sendMessageBreakfast(); 
   
    }


    if(currentTime.getTime()==notificationTimeLunch.getTime()){
        sendMessageLunch();
  }


  if(currentTime.getTime()>notificationTimeDinner.getTime){
    sendMessageDinner();
}
 

    }
    catch(error){
        console.log("error from automation ") 
    }



}

//send Message
async function sendMessageBreakfast() {

    //check time

    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.and]:  [{ [Op.gte]:new Date(new Date().setHours(7, 0, 0, 0)), }, { [Op.lte]:new Date(new Date().setHours(9, 0, 0, 0))  }],
            },
        },
    });
    const notii = await Users.findAll({
        where: {
            userlineId: {
                [Op.notIn]: users.map(e=>e.userlineid) 
            },

        },
    })

    notii.forEach(async (element) => {
          //เพิ่มทุกคนที่ไม่กินเข้าตารางnotis
          checkUserByNotiTable( element.userlineId)
    });

    try {
        if(notii.length>0){
        
            notii.forEach(async (element) => {
            const code = element.userlineId
   
            const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                to: code,
                messages: [
                    {
                        "type":"text",
                        "text":"คุณทานมื้อเช้ารึยัง"
                    },
                    {
                        "type":"image",
                        "originalContentUrl": "https://yungying.com/images/preme/1.png",
                        "previewImageUrl": "https://yungying.com/images/preme/1.png"
                    }
                ]
            }, {
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                }
            })

         
            
            const sentBreakfasteat = await noti.findAll({
                where: {
                    userid: code,
                },
            })
            if(sentBreakfasteat){
                await noti.update({
                    Breakfasteat: 1,
                },{
                    where:{
                        userid: code,
                    }
                })
            }

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
                [Op.and]:  [{ [Op.gte]:new Date(new Date().setHours(12, 0, 0, 0)), }, { [Op.lte]:new Date(new Date().setHours(13, 0, 0, 0))  }],
            },
        },
    });
    const notii = await Users.findAll({
        where: {
            userlineId: {
                [Op.notIn]: users.map(e=>e.userlineid) 
            },

        },
    })

    notii.forEach(async (element) => {
          //เพิ่มทุกคนที่ไม่กินเข้าตารางnotis
          checkUserByNotiTable( element.userlineId)
    });

    try {
        if(users){
            notii.forEach(async (element) => {
            const code = element.userlineId
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

           
            
            const sentpoint = await noti.findAll({
                where: {
                    userid: code,
                },
            })
            if(sentpoint){
                await noti.update({
                    Luncheat: 1,
                },{
                    where:{
                        userid: code,
                    }
                })
            }
        
        });
       

    }
}
    catch (error) {
        console.log("error")
    }



}

async function checkUserByNotiTable(id){
    const startday = new Date()
    startday.setHours(0);
    startday.setMinutes(0);
    startday.setSeconds(0);
    const endday = new Date()
    endday.setHours(23);
    endday.setMinutes(59);
    endday.setSeconds(59);
    const checkUserInNoti = await noti.findOne({
        where: {
            userid: id,
            createdAt: { 
                [Op.and]: [{ [Op.gte]: startday }, { [Op.lte]: endday }]
            },
        },
    })
    if(!checkUserInNoti){
        const log = await noti.create({
            userid: id
        })
    }
}

async function sendMessageDinner() {
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(20, 0, 0, 0)), // >
            },
        },
    });

    checkUserByNotiTable(users[0].dataValues.userlineid)

    const checknoti = await noti.findAll({
        where: {
            dinnerEat: 0,
            createdAt: {
                [Op.gt]: new Date(new Date().setHours(20, 0, 0, 0)),
            }
        },
    })

        try {
            checknoti.forEach(async (element) => {
                const code = element.userid
                const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                    to: code,
                    messages: [
                        {
                            "type": "text",
                            "text": "จริงๆเเล้วมื้อเย็นควรทานก่อน 2 ทุ่ม... เเต่ไม่เป็นไร คราวหน้าเอาใหม่นะ!"
                        },
                        {
                            "type":"image",
                            "originalContentUrl": "https://yungying.com/images/preme/3.png",
                            "previewImageUrl": "https://yungying.com/images/preme/3.png"
                        },
                        {
                            "type":"image",
                            "originalContentUrl": "https://yungying.com/images/preme/4.png",
                            "previewImageUrl": "https://yungying.com/images/preme/4.png"
                        }
                    ]
                }, {
                    headers: {
                        "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                    }
                })

                const checknoti = await noti.findAll({
                    where: {
                        userid: code,
                    },
                })
                if(checknoti){
                    await noti.update({
                        dinnerEat: 1,
                    },{
                        where:{
                            userid: code,
                        }
                    })
                }
                else{ 
                    const log = await noti.create({
                    dinnerEat: 1,
                    userid: code
                })}

              
            });
        }
        catch (error) {
            console.log("error")
        }
    
    

   

}

module.exports = {
    Message,

}
