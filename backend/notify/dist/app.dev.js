"use strict";

var automation = require('./automation/automation');

var automonths = require('./automation/automationThreeMonth');

var conditionProtein = require('./condition/conditionProtein');

var conditioncarb = require('./condition/conditioncarb');

var conditioncal = require('./condition/conditioncal');

var conditionfat = require('./condition/conditionfat');

var conditionsalt = require('./condition/conditionsalt');

var conditionsugar = require('./condition/conditionsugar');

var conditionsuveg = require('./condition/conditionsuveg');

var notimonthlackProtein = require('./condition/notimonthlackProtein');

var overProtein = require('./condition/overProtein');

var lackcal = require('./condition/lackcal');

var lackfat = require('./condition/lackfat');

var lacksalt = require('./condition/lacksalt');

var lackveg = require('./condition/lackveg');

var lackcarb = require('./condition/lackcarb');

var overcal = require('./condition/overcal');

var overfat = require('./condition/overfat');

var oversalt = require('./condition/oversalt');

var overveg = require('./condition/overveg');

var overcarb = require('./condition/overcarb');

var lacksugar = require('./condition/lacksugar');

var oversugar = require('./condition/oversugar');

var compliment = require('./condition/compliment');

var doubleCal = require('./condition/doubleCal');

console.log("start");
setInterval(function () {//    //Automation เเจ้งเตือน ทานอาหาร+เเบบทดสอบ3เดือน
  // automation.Message();
  // automonths.MessageAutoMonth();
  // //condtition วัดการกินเเล้วอัพเดตตาราง
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
}, 1000);
doubleCal.condition();