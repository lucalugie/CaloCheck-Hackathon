const automation = require('./automation/automation');
const automonths = require('./automation/automationThreeMonth');
const conditionProtein = require('./condition/conditionProtein');
const conditioncarb = require('./condition/conditioncarb');
const conditioncal = require('./condition/conditioncal');
const conditionfat = require('./condition/conditionfat');
const conditionsalt= require('./condition/conditionsalt');
const conditionsugar = require('./condition/conditionsugar');
const conditionsuveg = require('./condition/conditionsuveg');
const notimonthlackProtein = require('./condition/notimonthlackProtein');
const overProtein = require('./condition/overProtein');
const lackcal = require('./condition/lackcal');
const lackfat = require('./condition/lackfat');
const lacksalt = require('./condition/lacksalt');
const lackveg = require('./condition/lackveg');
const lackcarb = require('./condition/lackcarb');
const overcal = require('./condition/overcal');
const overfat = require('./condition/overfat');
const oversalt = require('./condition/oversalt');
const overveg   = require('./condition/overveg');
const overcarb  = require('./condition/overcarb');
const lacksugar = require('./condition/lacksugar');
const oversugar = require('./condition/oversugar');
const compliment  = require('./condition/compliment');
//added
const doubleofcal = require('./conditionDay/doubleofcal');

console.log("start")
setInterval(() => {

   

},1000)
// //Automation เเจ้งเตือน ทานอาหาร+เเบบทดสอบ3เดือน
// automation.Message();
// automonths.MessageAutoMonth();

// // //condtition วัดการกินเเล้วอัพเดตตาราง
// conditioncarb.conditioncarb();
// conditionProtein.conditionProtein();
// conditioncal.conditioncal();
// conditionfat.conditionfat();
// conditionsalt.conditionsalt();
// conditionsugar.conditionsugar();
// conditionsuveg.conditionsuveg();

// //เเจ้งเตือนจากตาราง

//   lackcal.lackcalnoti();
//   lackcarb.lackcarbnoti();
//   lackfat.lackfatnoti();
// lacksalt.lacksaltnoti();
//  lackveg.lackvegnoti();
//  lacksugar.lacksugarnoti();
// overcal.overcalnoti();
// overfat.overfatnoti();
// overcarb.overcarbnoti();
//  notimonthlackProtein.notimonthlackProtein();
// oversalt.oversaltnoti();
// overveg.overvegnoti();
// oversugar.oversugarnoti();
//  overProtein.overproteinnoti();

//  //ชม
//  compliment.complimentnoti();

//added
doubleofcal.doubleofcal();