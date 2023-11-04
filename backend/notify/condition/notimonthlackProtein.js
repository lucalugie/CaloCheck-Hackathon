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

async function notimonthlackProtein() {
    const currentTime = new Date(); 
    const TimeTocheck = new Date(); 
    TimeTocheck.setHours(9) //เวลาในการเช็ค
    TimeTocheck.setMinutes(0);
    TimeTocheck.setSeconds(10);



    if(currentTime.getTime()==TimeTocheck.getTime()){
     
        lackofprotein()
    }


}

function countDaysInMonth(year, month) {
    // JavaScript months are zero-based, so we subtract 1 from the provided month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
}


async function lackofprotein() {
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

    const monthName =firstDayOfPreviousMonth.toLocaleString('th-TH', { month: 'long' });
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


    const lackProtein = await noticonmonths.count({
        where: {
            nameMon0thandyear: {
                [Op.like]: `${numberofPreviousMonth}%`
        },
            userlineid: element.userlineid,
            lackofprotein: 1,
        },
      });
      console.log("คุณ "+element.userlineid)
      console.log("ขาดโปรตีน "+lackProtein+" วัน ในเดือน "+monthName)

      //เดือนนี้มี ....วัน

      const lastDayOfMonth = countDaysInMonth(firstDayOfPreviousMonth.getFullYear(), firstDayOfPreviousMonth.getMonth()+1);
      const lackProteinPercent = (lackProtein/lastDayOfMonth)*100
      console.log("คิดเป็น "+lackProteinPercent+" %")

      if(lackProteinPercent>=50){
        checklistlackProtein(element.userlineid)
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
          [db.sequelize.fn('SUM', db.sequelize.col('lackofprotein')), 'lackofprotein']
        ],
        where: {
          nameMon0thandyear: {
            [Op.or]: array7day
          }
        },
        group: ['userlineid']
      });

   
      result.forEach(async (element) => {
          console.log("id:"+element.userlineid+" count: "+element.lackofprotein)


            if(element.lackofprotein>=7){
                const result = await Users.findAll({
                    where: {
                      userlineid: element.userlineid,
                    },
                  });
                const namenoti = result[0].displayName
                console.log(namenoti)
                const keep=element.userlineid
                sentwhenlack7day(keep,Todaysent,namenoti)
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


 async function checklistlackProtein(id) {
    const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
        to: code,
        messages: [
            {
                "type": "text",
                "text": "เดือนนี้คุณขาดโปรตีนเกิน 18 วันเเล้วนะ!! รีบเช็คดูว่ามีอาการเหล่านี้ไหม"
            },
            {
                "type":"image",
                "originalContentUrl": "https://yungying.com/images/preme/checklist/1.png",
                "previewImageUrl": "https://yungying.com/images/preme/checklist/1.png"
            },
            {
                "type": "text",
                "text": "ถ้ามีอาการครบทุกข้อ หรือครึ่งหนึ่ง รีบเติมโปรตีนด่วนๆเลยนะ"
            },
        ]
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
        }
    })
  }

  async function sentwhenlack7day(id,date,name) {
     //เช็คว่าเคยส่งหรือยัง
    const checknotiscon = await checknotisconditions.findOne({
        where: {
            userid: id,
            date: {
                [Op.like]: `${date}%`
            },
            lackofprotein: 1
        },
    })
    
            if(!checknotiscon){
                        const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
                            to: id,
                            messages: [
                                {
                                    "type": "text",
                                    "text": `เฮ้! ${name} คุณกินโปรตีนไม่ถึงเป้าหมายมาเป็นเวลา 7 วันเเล้วนะ`
                                },
                                {
                                    "type":"image",
                                    "originalContentUrl": "https://yungying.com/images/preme/5.png",
                                    "previewImageUrl": "https://yungying.com/images/preme/5.png"
                                },
                                {
                                    "type": "text",
                                    "text": `โปรตีนมีประโยชน์มากนะ ช่วยลดน้ำหนักได้ด้วย ลองอ่านบทความนี้ดูสิ https://shorturl.asia/vXkIn`
                                },
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
                                lackofprotein: 1,
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
                            lackofprotein: 1,
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
    notimonthlackProtein,

}