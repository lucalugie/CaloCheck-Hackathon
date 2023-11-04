const UsersGoals = require("../../node/model/UsersGoals");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op,Sequelize  } = require("sequelize");
const UsersNutrition = require("../../node/model/UsersNutrition");
const Users = require("../../node/model/User");
const notiCon = require("../../node/model/conditionnutrition");
const noticonmonths = require("../../node/model/noticonmonth");
const checknotisconditions = require("../../node/model/checknotisconditions");
const Checkmorenoticons = require("../../node/model/checkmorenoticons");
const db = require("../../node/config/database");
dotenv.config();
``
let count1 = 0;
let count2 = 0;
var set=[];
async function complimentnoti() {
    const currentTime = new Date(); 
    const checkeveryday = new Date(); 
    const TimeTocheck = new Date(currentTime.getFullYear(), currentTime.getMonth(), 30);
    checkeveryday.setHours(12) //เวลาในการเช็ค
    checkeveryday.setMinutes(30);
    checkeveryday.setSeconds(0);


    if(currentTime.getTime()==checkeveryday.getTime()){
        start()
    }

}

async function start(){
    console.log("noti month")
    //------------คิดเปอร์เซ็น ทั้งเดือน(เดือนที่เเล้ว)-----------

    //วันเเรกของเดือน
    const today = new Date()
    const Todayly = today.toLocaleDateString();
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

    const result = await Checkmorenoticons.findAll({
        attributes: [
            'userid',
            [db.sequelize.fn('SUM', db.sequelize.col('lackofprotein')), 'lackofprotein'],
            [db.sequelize.fn('SUM', db.sequelize.col('overprotein')), 'overprotein'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackofcal')), 'lackofcal'],
            [db.sequelize.fn('SUM', db.sequelize.col('overcal')), 'overcal'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackfat')), 'lackfat'],
            [db.sequelize.fn('SUM', db.sequelize.col('overfat')), 'overfat'],
            [db.sequelize.fn('SUM', db.sequelize.col('lacksalt')), 'lacksalt'],
            [db.sequelize.fn('SUM', db.sequelize.col('oversalt')), 'oversalt'],
            [db.sequelize.fn('SUM', db.sequelize.col('lacksugar')), 'lacksugar'],
            [db.sequelize.fn('SUM', db.sequelize.col('oversugar')), 'oversugar'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackveg')), 'lackveg'],
            [db.sequelize.fn('SUM', db.sequelize.col('overveg')), 'overveg'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackcarb')), 'lackcarb'],
            [db.sequelize.fn('SUM', db.sequelize.col('overcarb')), 'overcarb'],
          ],
        where: {
            date: {
                [Op.like]: `${numberofPreviousMonth}%`
        },

        },
        group: ['userid']
      });
   
      console.log(result)
      result.forEach(async (e) => {
        let lackprotein = parseInt(e.lackofprotein);
        let overprotein = parseInt(e.overprotein);
        let lackofcal = parseInt(e.lackofcal);
        let overcal = parseInt(e.overcal);
        let lackfat = parseInt(e.lackfat);
        let overfat = parseInt(e.overfat);
        let lacksalt = parseInt(e.lacksalt);
        let oversalt = parseInt(e.oversalt);
        let lacksugar = parseInt(e.lacksugar);
        let oversugar = parseInt(e.oversugar);
        let lackveg = parseInt(e.lackveg);
        let overveg = parseInt(e.overveg);
        let lackcarb = parseInt(e.lackcarb);
        let overcarb = parseInt(e.overcarb);

      console.log("คุณ "+e.userid)
      count1=lackprotein+overprotein+lackofcal+overcal+lackfat+overfat+lacksalt+oversalt+lacksugar+oversugar+lackveg+overveg+lackcarb+overcarb;
        console.log("มีเเต้มการเเจ้งเตือน "+count1)
       
    

      //-------7days-------------
      const newdate = new Date().toLocaleDateString();
      
      const result2 = await checknotisconditions.findAll({
        attributes: [
            'userid',
            [db.sequelize.fn('SUM', db.sequelize.col('lackofprotein')), 'lackofprotein'],
            [db.sequelize.fn('SUM', db.sequelize.col('overprotein')), 'overprotein'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackofcal')), 'lackofcal'],
            [db.sequelize.fn('SUM', db.sequelize.col('overcal')), 'overcal'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackfat')), 'lackfat'],
            [db.sequelize.fn('SUM', db.sequelize.col('overfat')), 'overfat'],
            [db.sequelize.fn('SUM', db.sequelize.col('lacksalt')), 'lacksalt'],
            [db.sequelize.fn('SUM', db.sequelize.col('oversalt')), 'oversalt'],
            [db.sequelize.fn('SUM', db.sequelize.col('lacksugar')), 'lacksugar'],
            [db.sequelize.fn('SUM', db.sequelize.col('oversugar')), 'oversugar'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackveg')), 'lackveg'],
            [db.sequelize.fn('SUM', db.sequelize.col('overveg')), 'overveg'],
            [db.sequelize.fn('SUM', db.sequelize.col('lackcarb')), 'lackcarb'],
            [db.sequelize.fn('SUM', db.sequelize.col('overcarb')), 'overcarb'],
          ],
        where: {
            date: {
                [Op.like]: `${newdate}%`
        },
        userid: e.userid

        },
        group: ['userid']
      });
   

      result2.forEach(async (e) => {
        let lackprotein = parseInt(e.lackofprotein);
        let overprotein = parseInt(e.overprotein);
        let lackofcal = parseInt(e.lackofcal);
        let overcal = parseInt(e.overcal);
        let lackfat = parseInt(e.lackfat);
        let overfat = parseInt(e.overfat);
        let lacksalt = parseInt(e.lacksalt);
        let oversalt = parseInt(e.oversalt);
        let lacksugar = parseInt(e.lacksugar);
        let oversugar = parseInt(e.oversugar);
        let lackveg = parseInt(e.lackveg);
        let overveg = parseInt(e.overveg);
        let lackcarb = parseInt(e.lackcarb);
        let overcarb = parseInt(e.overcarb);

      console.log("คุณ "+e.userid)
      count2=lackprotein+overprotein+lackofcal+overcal+lackfat+overfat+lacksalt+oversalt+lacksugar+oversugar+lackveg+overveg+lackcarb+overcarb;
    
       
      })
   
      
      if((count2+count1)<3){
        console.log("มีเเต้มการเเจ้งเตือน "+(count2+count1))
        sendMessage1(e.userid)
      }
      if((count2+count1)>5 && (count2+count1)<6){
        console.log("มีเเต้มการเเจ้งเตือน "+(count2+count1))
        sendMessage(e.userid)
      }
      
    })

   
}

async function sendMessage1(id) {
    const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
        to: id,
        messages: [
            {
                "type": "text",
                "text": "คุณสุดยอดไปเลย รักษาวินัยได้ดีมาก ԅ║ . º ◯ º . ║ノ "
            },
            {
                "type":"image",
                "originalContentUrl": "https://img.a4h6.c18.e2-4.dev/5ab7bb1f3dafd3e4db6bedff7a1b58d5.png",
                "previewImageUrl": "https://img.a4h6.c18.e2-4.dev/5ab7bb1f3dafd3e4db6bedff7a1b58d5.png"
            }
        ]
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
        }
    })
}

async function sendMessage(id) {
    const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
        to: id,
        messages: [
            {
                "type": "text",
                "text": "คุณเป็นคนที่ดูแลสุขภาพให้ดีขึ้นในทุกวัน เราชื่นชมคุณนะ ( ॣ•͈૦•͈ ॣ) "
            },
            {
                "type":"image",
                "originalContentUrl": "https://i.imgz.io/2023/11/05/-1.png",
                "previewImageUrl": "https://i.imgz.io/2023/11/05/-1.png"
            }
        ]
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.TOKEN_LINE_CALOCHECK}`
        }
    })
}

module.exports = {
    complimentnoti,

}