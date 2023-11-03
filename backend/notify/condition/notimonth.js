const UsersGoals = require("../../node/model/UsersGoals");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const UsersNutrition = require("../../node/model/UsersNutrition");
const Users = require("../../node/model/User");
const notiCon = require("../../node/model/conditionnutrition");
const noticonmonths = require("../../node/model/noticonmonth");
const checknotisconditions = require("../../node/model/checknotisconditions");
dotenv.config();

let uniqueData = new Map();

async function notimonth() {
    lackofprotein()
    // overprotein()
    // lackofcal()
    // overcal()
    // lackfat()
    // overfat()
    // lacksalt()
    // oversalt()
    // lacksugar()
    // oversugar()
    // lackveg()
    // overveg()
    // lackcarb()
    // overcarb()


}

function countDaysInMonth(year, month) {
    // JavaScript months are zero-based, so we subtract 1 from the provided month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  }


  async function lackofprotein() {
    // console.log("noti month")
    // //------------คิดเปอร์เซ็น ทั้งเดือน(เดือนที่เเล้ว)-----------

    // //วันเเรกของเดือน
    // const today = new Date()
    // const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    // firstDayOfPreviousMonth.setHours(0);
    // firstDayOfPreviousMonth.setMinutes(0);
    // firstDayOfPreviousMonth.setSeconds(0);
    // console.log(firstDayOfPreviousMonth.toLocaleDateString())

    // //วันสุดท้ายของเดือนที่เเล้ว
    // const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
    // lastDayOfPreviousMonth.setHours(23);
    // lastDayOfPreviousMonth.setMinutes(59);
    // lastDayOfPreviousMonth.setSeconds(59);

    // const monthName =firstDayOfPreviousMonth.toLocaleString('th-TH', { month: 'long' });
    // const numberofPreviousMonth=firstDayOfPreviousMonth.getMonth()+1

    // console.log(numberofPreviousMonth)

    // console.log("-------------")
    
    // const users = await noticonmonths.findAll({
    //     where: {
    //         nameMon0thandyear: {
    //             [Op.like]: `${numberofPreviousMonth}%`
    //     },
    // },
    // });
    
    //   users.forEach(async (element) => {
    //     console.log(element.userlineid)
  
    
    // const lackProtein = await noticonmonths.count({
    //     where: {
    //         nameMon0thandyear: {
    //             [Op.like]: `${numberofPreviousMonth}%`
    //     },
    //         userlineid: element.userlineid,
    //         lackofprotein: 1,
    //     },
    //   });
    //   console.log("คุณ "+element.userlineid)
    //   console.log("ขาดโปรตีน "+lackProtein+" วัน ในเดือน "+monthName)
    
    //   //เดือนนี้มี ....วัน
    
    //   const lastDayOfMonth = countDaysInMonth(firstDayOfPreviousMonth.getFullYear(), firstDayOfPreviousMonth.getMonth()+1);
    //   const lackProteinPercent = (lackProtein/lastDayOfMonth)*100
    //   console.log("คิดเป็น "+lackProteinPercent+" %")
    
    //   if(lackProteinPercent>50){
    //     // checklistlackProtein(element.userlineid)
    //   }

    // })

    //------------------------ต่อเนื่อง 7 วัน-------------------------------


    const To= new Date();
    const Todaysent = To.toLocaleDateString();
    const last7Days = getLast7Days();
    console.log('Date Range for the Last 7 Days:');
    last7Days.forEach(async (g) => {
        const dayly = g.toLocaleDateString()
        console.log(dayly);

    const getusers = await noticonmonths.findAll({
        where: {
            nameMon0thandyear: {
                [Op.like]: `${dayly}%`
        },
        },
      });
    
      getusers.forEach(async (element) => {
       
    
    const countlackProtein = await noticonmonths.count({
        where: {
            userlineid: element.userlineid,
            lackofprotein: 1,
        },
      });
      const keeotosent=element.userlineid
    
      if(countlackProtein>=7){
         sentwhenlack7day(keeotosent,Todaysent)
      }


    })

    
});
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
                "text": "เช็คลิสขาดโปรตีนในเดือนนี้"
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
  }

  async function sentwhenlack7day(id,date) {

//     addData({ id: id, date: date });
//     const uniqueData = new Map([...uniqueData.values()])

//     const idArray = Array.from(uniqueData.values(), async data => {
//         const useid=data.id
//         const useDate=data.date
//         // senttest(useid)

//     })
    //เช็คว่าเคยส่งหรือยัง
//     const checknotiscon = await checknotisconditions.findOne({
//         where: {
//             userid: useid,
//             date: useDate,
//             lackofprotein: 1
//         },
//     })
// if(!checknotiscon){
//     console.log("---send---")
//     console.log("test "+useid);
//             const checknoti = await checknotisconditions.findAll({
//                 where: {
//                     userid: useid,
//                     date: useDate,
//                     lackofprotein: 1
//                 },
//             })
//             if(checknoti.length>0){
//                 console.log("มี")
//                 await checknotisconditions.update({
//                     lackofprotein: 1,
//                     date: useDate
//                 },{
//                     where:{
//                         userid: useid,
//                     }
//                 })
//             }
//             else{ 
//                 console.log("ไม่มี")
//                 const log = await checknotisconditions.create({
//                 lackofprotein: 1,
//                 userid: useid,
//                 date: useDate
//             })
//             }
//         }
//         else{
//             console.log("เคยส่งแล้ว")
//         }
//     });

   

}

function addData(data) {
    // ตรวจสอบว่ารหัสไม่ซ้ำกัน
    if (!uniqueData.has(data.code)) {
        uniqueData.set(data.code, data);
        console.log("เพิ่มข้อมูลเรียบร้อย");
    } else {
       return
    }
}


async function senttest(useid){
    const token = await axios.post(`https://api.line.me/v2/bot/message/push`, {
        to: useid,
        messages: [
            {
                "type": "text",
                "text": "เช็คลิสขาดโปรตีนในเดือนนี้"
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
}
  
module.exports = {
    notimonth,

}