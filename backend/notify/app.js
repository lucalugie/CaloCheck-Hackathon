const automation = require('./automation/automation');
const automonths = require('./automation/automationThreeMonth');
const conditionProtein = require('./condition/conditionProtein');
const conditioncarb = require('./condition/conditioncarb');
const conditioncal = require('./condition/conditioncal');
const conditionfat = require('./condition/conditionfat');
const conditionsalt= require('./condition/conditionsalt');
const conditionsugar = require('./condition/conditionsugar');
const conditionsuveg = require('./condition/conditionsuveg');
const notimonth = require('./condition/notimonth');
console.log("start")
setInterval(() => {


},1000)

//Automation
// automation.Message();
// automonths.MessageAutoMonth();

//condtition วัดการกินเเล้วอัพเดตตาราง
// conditioncarb.conditioncarb();
// conditionProtein.conditionProtein();
// conditioncal.conditioncal();
// conditionfat.conditionfat();
// conditionsalt.conditionsalt();
// conditionsugar.conditionsugar();
// conditionsuveg.conditionsuveg();


//เเจ้งเตือนจากตาราง
notimonth.notimonth();