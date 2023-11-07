const UsersGoals = require("../../node/model/UsersGoals");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const UsersNutrition = require("../../node/model/UsersNutrition");
const Users = require("../../node/model/User");
const notiCon = require("../../node/model/conditionnutrition");
const noticonmonths = require("../../node/model/noticonmonth");
dotenv.config();

async function conditioncarb() {
    const currentTime = new Date(); 
    const checkeveryday = new Date(); 

    checkeveryday.setHours(23) //เวลาในการเช็ค
    checkeveryday.setMinutes(59);
    checkeveryday.setSeconds(58);
   

    if(currentTime.getTime()==checkeveryday.getTime()){
        conditioncarbB()
    }

}

async function conditioncarbB() {

    const startday = new Date()
    const startday1 = new Date()
    startday1.setHours(0);
    startday1.setMinutes(0);
    startday1.setSeconds(0);
    const endday = new Date()
    endday.setHours(23);
    endday.setMinutes(59);
    endday.setSeconds(59);

    const datemandy=startday.getMonth()+"/"+startday.getFullYear()
    console.log("start "+datemandy)
  
   
    const users = await noticonmonths.findAll({
        where: {
            nameMon0thandyear: datemandy,
        },
    })

    //ทุกคนยกเว้นคนที่มีอยู่ในตาราง notiCon
    const notii = await Users.findAll({
        where: {
            userlineId: {
                [Op.notIn]: users.map(e=>e.userlineid) 
            },

        },
    })

    notii.forEach(async (element) => {
     //สร้าง
    checkUserByNotiTable( element.userlineId)
    })


      notii.forEach(async (element) => {

        const goal = await UsersGoals.findAll({
            where: {
                userlineId: element.userlineId,

            },
        })

        const eat = await UsersNutrition.findAll({
            where: {
                userlineid: element.userlineId,
                createdAt: { 
                    [Op.and]: [{ [Op.gte]: startday1 }, { [Op.lte]: endday }]
                },
    
            },
        })

        goal.forEach(async (g) => {
            eat.forEach(async (value) => {
                //Protein

                //เกิน
                const carb = g.goals_carb-value.ach_carb
                console.log("คุณ "+element.displayName)

                //110% of goal
                const overCarb =g.goals_carb*1.1
                console.log("กิน carb ไป  "+value.ach_carb+" จากเป้าหมาย "+g.goals_carb+" ขาดอีก "+carb)
                console.log("carb ที่สามารถกินได้มากสุด คือ "+overCarb)


       
                    if(value.ach_carb>=overCarb){
                        console.log("over carb")
                        await noticonmonths.update({
                            overcarb: 1,
                            lackcarb: 0
                        },{
                            where:{
                                userlineid: element.userlineId,
                            }
                        })
                        
                    }
                    else if(value.ach_carb<g.goals_carb){
                        console.log("lack carb")
                        await noticonmonths.update({
                            lackcarb: 1,
                            overcarb:0
                        },{
                            where:{
                                userlineid: element.userlineId,
                            }
                        })
                        
                    }
                    else{
                        console.log("good")
                        await noticonmonths.update({
                            lackcarb: 0,
                            overcarb:0
                        },{
                            where:{
                                userlineid: element.userlineId,
                            }
                        })
                        
                    }
                
                    console.log("------")
        
            })
            
        })
    

    })

}

async function checkUserByNotiTable(id){
    const startday = new Date()

    const checkUserInNoti = await noticonmonths.findOne({
        where: {
            userlineid: id,
            nameMon0thandyear: startday.toLocaleDateString()
        },
    })
    if(!checkUserInNoti){
        const log = await noticonmonths.create({
            userlineid: id,
            nameMon0thandyear: startday.toLocaleDateString()
        })
    }
}

module.exports = {
    conditioncarb,

}