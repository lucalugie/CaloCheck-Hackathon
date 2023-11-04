const UsersGoals = require("../../node/model/UsersGoals");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op,Sequelize  } = require("sequelize");
const UsersNutrition = require("../../node/model/UsersNutrition");
const Users = require("../../node/model/User");
const notiCon = require("../../node/model/conditionnutrition");
const noticonmonths = require("../../node/model/noticonmonth");
const checknotisconditions = require("../../node/model/checknotisconditions");
const db = require("../../node/config/database");
dotenv.config();

let uniqueData = new Map();

async function overvegnoti() {
    const currentTime = new Date(); 
    const TimeTocheck = new Date(); 
    TimeTocheck.setHours(9) //เวลาในการเช็ค
    TimeTocheck.setMinutes(0);
    TimeTocheck.setSeconds(10);

     


    if(currentTime.getTime()==TimeTocheck.getTime()){
        overveg()
    }


}

function countDaysInMonth(year, month) {
    // JavaScript months are zero-based, so we subtract 1 from the provided month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
}


async function overveg() {
    console.log("noti month")
    //------------คิดเปอร์เซ็น ทั้งเดือน(เดือนที่เเล้ว)-----------

    //วันเเรกของเดือน
    const today = new Date()
    const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    firstDayOfPreviousMonth.setHours(0);
    firstDayOfPreviousMonth.setMinutes(0);
    firstDayOfPreviousMonth.setSeconds(0);
    console.log(firstDayOfPreviousMonth.toLocaleDateString())

    //วันสุดท้ายของเดือนที่เเล้ว
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
    lastDayOfPreviousMonth.setHours(23);
    lastDayOfPreviousMonth.setMinutes(59);
    lastDayOfPreviousMonth.setSeconds(59);

    const monthName =firstDayOfPreviousMonth.toLocaleDateString('th-TH', { month: 'long' });
    const numberofPreviousMonth=firstDayOfPreviousMonth.getMonth()+1

    console.log(numberofPreviousMonth)

    console.log("-------------")

    const users = await noticonmonths.findAll({
        where: {
            nameMon0thandyear: {
                [Op.like]: `${numberofPreviousMonth}%`
        },
    },
    });

      users.forEach(async (element) => {
        console.log(element.userlineid)


    const overveg = await noticonmonths.count({
        where: {
            nameMon0thandyear: {
                [Op.like]: `${numberofPreviousMonth}%`
        },
            userlineid: element.userlineid,
            overveg: 1,
        },
      });
      console.log("คุณ "+element.userlineid)
      console.log("ขาดโปรตีน "+overveg+" วัน ในเดือน "+monthName)

      //เดือนนี้มี ....วัน

      const lastDayOfMonth = countDaysInMonth(firstDayOfPreviousMonth.getFullYear(), firstDayOfPreviousMonth.getMonth()+1);
      const overvegPercent = (overveg/lastDayOfMonth)*100
      console.log("คิดเป็น "+overvegPercent+" %")

      if(overvegPercent>=50){
        checklistoverveg(element.userlineid)
      }

    })

    //------------------------ต่อเนื่อง 7 วัน-------------------------------
    check7Days();
async function check7Days() {
    const To = new Date();
    const Todaysent = To.toLocaleDateString();
    const last7Days = getLast7Days();

    const array7day = [];

    last7Days.forEach(async (g) => {
        const dayly = g.toLocaleDateString();
        array7day.push(dayly);
    });



    const result = await noticonmonths.findAll({
        attributes: [
          'userlineid',
          [db.sequelize.fn('SUM', db.sequelize.col('overveg')), 'overveg']
        ],
        where: {
          nameMon0thandyear: {
            [Op.or]: array7day
          }
        },
        group: ['userlineid']
      });

   
      result.forEach(async (element) => {
          console.log("id:"+element.userlineid+" count: "+element.overveg)


            if(element.overveg>=7){
                const result = await Users.findAll({
                    where: {
                      userlineid: element.userlineid,
                    },
                  });
                const namenoti = result[0].displayName
                console.log(namenoti)
                const keep=element.userlineid
                sentwhenover7day(keep,Todaysent,namenoti)
              }
            else{
                return
            }

      })

}
    


}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function getLast7Days() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 8);

    const dateRange = [];
    let currentDate = sevenDaysAgo;

    while (currentDate <= today) {
        dateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
}


 async function checklistoverveg(id) {
    const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
        to: code,
        messages: [
            {
                "type": "text",
                "text": "ทานผักเยอะไปก็ไม่ดีนะ"
            },
            {
                "type":"image",
                "originalContentUrl": "https://yungying.com/images/preme/checklist/8.png",
                "previewImageUrl": "https://yungying.com/images/preme/checklist/8.png"
            },
            {
                "type": "text",
                "text": "ผักกินมากไปก็ไม่ดี โดยเฉพาะผักสด เนื่องจากย่อยยาก อีกทั้งเซลลูโลสจำนวนมาก ยังมีผลยับยั้งการดูดซึมแคลเซียมและสังกะสีด้วย"
            },
        ]
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
        }
    })
  }

  async function sentwhenover7day(id,date,name) {
     //เช็คว่าเคยส่งหรือยัง
    const checknotiscon = await checknotisconditions.findOne({
        where: {
            userid: id,
            date: {
                [Op.like]: `${date}%`
            },
            overveg: 1
        },
    })
    
            if(!checknotiscon){
                        const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                            to: id,
                            messages: [
                                {
                                    "type": "text",
                                    "text": `เฮ้! ${name} ช่วงนี้คุณกินผักเยอะไปนะ`
                                },
                                {
                                    "type":"image",
                                    "originalContentUrl": "https://yungying.com/images/preme/12.png",
                                    "previewImageUrl": "https://yungying.com/images/preme/12.png"
                                }
                            ]
                        }, {
                            headers: {
                                "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
                            }
                        })
                        const checknoti = await checknotisconditions.findAll({
                            where: {
                                userid: id,
                                date: {
                                    [Op.like]: `${date}%`
                                },
                            },
                        })
                        if(checknoti.length>0){
                            console.log("มี")
                            await checknotisconditions.update({
                                overveg: 1,
                                date: date
                            },{
                                where:{
                                    userid: id,
                                }
                            })
                        }
                        else{ 
                            console.log("ไม่มี")
                            const log = await checknotisconditions.create({
                            overveg: 1,
                            userid: id,
                            date: date
                        })
                        }
            }

        else{
            console.log("เคยส่งแล้ว")
            return
        }
    }

   






  
module.exports = {
    overvegnoti,

}