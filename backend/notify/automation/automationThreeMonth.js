const Users = require("../../node/model/User");
const dotenv = require('dotenv');
const axios = require('axios');
const { Op } = require("sequelize");
const Usershistory = require("../../node/model/Usershistory");
dotenv.config();


async function MessageAutoMonth() {

    /************ ตัวเเปร *************/
    const userData = [
        {
            id: 1,
            name: "user1",
            age:50,
        },
        {
            id: 2,
            name: "user2",
            age:20
        }
    ]

    /******รวมฟังก์ชั้นส่งข้อความ*************/
    async function sendMessageMNA() {
        console.log("แบบทดสอบประเมินภาวะทุนโภชนาการ")
    }

    async function sendMessageNormal() {
        console.log("แบบทดสอบประเมินภาวะทุนโภชนาการ")
    }
    /***************นับเวลา 3 เดือน********************/

    
    
    var currentDate = new Date();  //วันที่สมัครบัญชีของเเต่ละคน
    // เพิ่ม 3 เดือน
    var threeMonthsLater = new Date(currentDate.getTime());
    threeMonthsLater.setMonth(currentDate.getMonth() + 3);  
    
    // คำนวณจำนวนวันทั้งหมดใน 3 เดือน
    var totalDaysInThreeMonths = Math.floor((threeMonthsLater - currentDate) / (1000 * 60 * 60 * 24));
    
    console.log("ขาดอีก " + totalDaysInThreeMonths + " วัน จะครบ 3 เดือน");



        if (totalDaysInThreeMonths==0) {  
            userData.forEach(async (user) => {
                if(user.age>30){
                    console.log(user.name)  
                    sendMessageMNA()
                }
                else{
                    console.log(user.name)
                    sendMessageNormal();
                }
            })
           


        }


}
module.exports = {
    MessageAutoMonth,

}
