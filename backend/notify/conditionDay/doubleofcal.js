const db = require("../../node/config/database");

async function doubleofcal() {
    const currentTime = new Date(); 
 
    const checkeverydayend = new Date(); 
    checkeverydayend.setHours(23) //เวลาในการเช็ค
    checkeverydayend.setMinutes(59);
    checkeverydayend.setSeconds(59);

    const checkeverydaystart = new Date();
    checkeverydaystart.setHours(1) //เวลาในการเช็ค
    checkeverydaystart.setMinutes(0);
    checkeverydaystart.setSeconds(0);

    if(currentTime.getTime()<checkeverydayend.getTime() && currentTime.getTime()>checkeverydaystart.getTime()){
        check()
    }
    
}

async function check() {
    const currentTime = new Date(); 
 
    const checkeverydayend = new Date(); 
    checkeverydayend.setHours(23) //เวลาในการเช็ค
    checkeverydayend.setMinutes(59);
    checkeverydayend.setSeconds(59);

    const checkeverydaystart = new Date();
    checkeverydaystart.setHours(1) //เวลาในการเช็ค
    checkeverydaystart.setMinutes(0);
    checkeverydaystart.setSeconds(0);
    const users = await Usershistory.findAll({
        where: {
            createdAt: {
                [Op.and]:  [{ [Op.gte]:checkeverydaystart }, { [Op.lte]:checkeverydayend }],
            },
        },
    });

    checkUserByNotiTable(users[0].dataValues.userlineid)

    const checknoti = await noti.findAll({
        where: {
            morecal: 0,
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
  
module.exports = {
    doubleofcal,

}