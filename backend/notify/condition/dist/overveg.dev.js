"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UsersGoals = require("../../node/model/UsersGoals");

var dotenv = require('dotenv');

var axios = require('axios');

var _require = require("sequelize"),
    Op = _require.Op,
    Sequelize = _require.Sequelize;

var UsersNutrition = require("../../node/model/UsersNutrition");

var Users = require("../../node/model/User");

var notiCon = require("../../node/model/conditionnutrition");

var noticonmonths = require("../../node/model/noticonmonth");

var checknotisconditions = require("../../node/model/checknotisconditions");

var Checkmorenoticons = require("../../node/model/checkmorenoticons");

var db = require("../../node/config/database");

dotenv.config();
var uniqueData = new Map();

function overvegnoti() {
  var currentTime, checkeveryday, TimeTocheck;
  return regeneratorRuntime.async(function overvegnoti$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentTime = new Date();
          checkeveryday = new Date();
          TimeTocheck = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
          checkeveryday.setHours(9); //เวลาในการเช็ค

          checkeveryday.setMinutes(0);
          checkeveryday.setSeconds(20);

          if (currentTime.getTime() == TimeTocheck.getTime()) {
            overveg();
          }

          if (currentTime.getTime() == checkeveryday.getTime()) {
            check7Days();
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function countDaysInMonth(year, month) {
  // JavaScript months are zero-based, so we subtract 1 from the provided month
  var lastDayOfMonth = new Date(year, month, 0).getDate();
  return lastDayOfMonth;
}

function overveg() {
  var today, Todaysent, firstDayOfPreviousMonth, firstDayOfCurrentMonth, lastDayOfPreviousMonth, monthName, numberofPreviousMonth, overveg;
  return regeneratorRuntime.async(function overveg$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("noti month"); //------------คิดเปอร์เซ็น ทั้งเดือน(เดือนที่เเล้ว)-----------
          //วันเเรกของเดือน

          today = new Date();
          Todaysent = today.toLocaleDateString();
          firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          firstDayOfPreviousMonth.setHours(0);
          firstDayOfPreviousMonth.setMinutes(0);
          firstDayOfPreviousMonth.setSeconds(0);
          console.log(firstDayOfPreviousMonth.toLocaleDateString()); //วันสุดท้ายของเดือนที่เเล้ว

          firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
          lastDayOfPreviousMonth.setHours(23);
          lastDayOfPreviousMonth.setMinutes(59);
          lastDayOfPreviousMonth.setSeconds(59);
          monthName = firstDayOfPreviousMonth.toLocaleString('th-TH', {
            month: 'long'
          });
          numberofPreviousMonth = firstDayOfPreviousMonth.getMonth() + 1;
          console.log(numberofPreviousMonth);
          console.log("-------------");
          _context3.next = 19;
          return regeneratorRuntime.awrap(noticonmonths.findAll({
            attributes: ['userlineid', [db.sequelize.fn('SUM', db.sequelize.col('overveg')), 'overveg']],
            where: {
              nameMon0thandyear: _defineProperty({}, Op.like, "%/".concat(numberofPreviousMonth, "/%"))
            },
            group: ['userlineid']
          }));

        case 19:
          overveg = _context3.sent;
          overveg.forEach(function _callee(e) {
            var lastDayOfMonth, overvegPercent;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    console.log("คุณ " + e.userlineid);
                    console.log("ขาดveg " + e.overveg + " วัน ในเดือน " + monthName); //เดือนนี้มี ....วัน

                    lastDayOfMonth = countDaysInMonth(firstDayOfPreviousMonth.getFullYear(), firstDayOfPreviousMonth.getMonth() + 1);
                    overvegPercent = e.overveg / lastDayOfMonth * 100;
                    console.log("คิดเป็น " + overvegPercent + " %");

                    if (overvegPercent >= 50) {
                      checklistoveveg(e.userlineid, Todaysent);
                    }

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }); //------------------------ต่อเนื่อง 7 วัน-------------------------------

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function check7Days() {
  var To, Todaysent, last7Days, array7day, result;
  return regeneratorRuntime.async(function check7Days$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          To = new Date();
          Todaysent = To.toLocaleDateString();
          last7Days = getLast7Days();
          array7day = [];
          last7Days.forEach(function _callee2(g) {
            var dayly;
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    dayly = g.toLocaleDateString();
                    array7day.push(dayly);

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          _context6.next = 7;
          return regeneratorRuntime.awrap(noticonmonths.findAll({
            attributes: ['userlineid', [db.sequelize.fn('SUM', db.sequelize.col('overveg')), 'overveg']],
            where: {
              nameMon0thandyear: _defineProperty({}, Op.or, array7day)
            },
            group: ['userlineid']
          }));

        case 7:
          result = _context6.sent;
          result.forEach(function _callee3(element) {
            var _result, namenoti, keep;

            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    console.log("id:" + element.userlineid + " count: " + element.overveg);

                    if (!(element.overveg >= 7)) {
                      _context5.next = 11;
                      break;
                    }

                    _context5.next = 4;
                    return regeneratorRuntime.awrap(Users.findAll({
                      where: {
                        userlineid: element.userlineid
                      }
                    }));

                  case 4:
                    _result = _context5.sent;
                    namenoti = _result[0].displayName;
                    console.log(namenoti);
                    keep = element.userlineid;
                    sentwhenover7day(keep, Todaysent, namenoti);
                    _context5.next = 12;
                    break;

                  case 11:
                    return _context5.abrupt("return");

                  case 12:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

function getLast7Days() {
  var today = new Date();
  var sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 8);
  var dateRange = [];
  var currentDate = sevenDaysAgo;

  while (currentDate <= today) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
}

function checklistoveveg(id, date) {
  var checknotiscon, token, checknoti, log;
  return regeneratorRuntime.async(function checklistoveveg$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Checkmorenoticons.findOne({
            where: {
              userid: id,
              date: _defineProperty({}, Op.like, "".concat(date, "%")),
              overveg: 1
            }
          }));

        case 2:
          checknotiscon = _context7.sent;

          if (checknotiscon) {
            _context7.next = 20;
            break;
          }

          _context7.next = 6;
          return regeneratorRuntime.awrap(axios.post("https://api.line.me/v2/bot/message/push", {
            to: id,
            messages: [{
              "type": "text",
              "text": "ทานผักเยอะไปก็ไม่ดีนะ q(╯ᆺ╰๑) "
            }, {
              "type": "image",
              "originalContentUrl": "https://yungying.com/images/preme/checklist/8.png",
              "previewImageUrl": "https://yungying.com/images/preme/checklist/8.png"
            }, {
              "type": "text",
              "text": "ผักกินมากไปก็ไม่ดี โดยเฉพาะผักสด เนื่องจากย่อยยาก อีกทั้งเซลลูโลสจำนวนมาก ยังมีผลยับยั้งการดูดซึมแคลเซียมและสังกะสีด้วย"
            }]
          }, {
            headers: {
              "Authorization": "Bearer ".concat(process.env.TOKEN_LINE_CALOCHECK)
            }
          }));

        case 6:
          token = _context7.sent;
          _context7.next = 9;
          return regeneratorRuntime.awrap(Checkmorenoticons.findAll({
            where: {
              userid: id,
              date: _defineProperty({}, Op.like, "".concat(date, "%"))
            }
          }));

        case 9:
          checknoti = _context7.sent;

          if (!(checknoti.length > 0)) {
            _context7.next = 16;
            break;
          }

          console.log("มี");
          _context7.next = 14;
          return regeneratorRuntime.awrap(Checkmorenoticons.update({
            overveg: 1,
            date: date
          }, {
            where: {
              userid: id
            }
          }));

        case 14:
          _context7.next = 20;
          break;

        case 16:
          console.log("ไม่มี");
          _context7.next = 19;
          return regeneratorRuntime.awrap(Checkmorenoticons.create({
            overveg: 1,
            userid: id,
            date: date
          }));

        case 19:
          log = _context7.sent;

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function sentwhenover7day(id, date, name) {
  var checknotiscon, token, checknoti, log;
  return regeneratorRuntime.async(function sentwhenover7day$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(checknotisconditions.findOne({
            where: {
              userid: id,
              date: _defineProperty({}, Op.like, "".concat(date, "%")),
              overveg: 1
            }
          }));

        case 2:
          checknotiscon = _context8.sent;

          if (checknotiscon) {
            _context8.next = 22;
            break;
          }

          _context8.next = 6;
          return regeneratorRuntime.awrap(axios.post("https://api.line.me/v2/bot/message/push", {
            to: id,
            messages: [{
              "type": "text",
              "text": "\u0E40\u0E2E\u0E49! ".concat(name, " \u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49\u0E04\u0E38\u0E13\u0E01\u0E34\u0E19\u0E1C\u0E31\u0E01\u0E40\u0E22\u0E2D\u0E30\u0E44\u0E1B\u0E19\u0E30")
            }, {
              "type": "image",
              "originalContentUrl": "https://yungying.com/images/preme/12.png",
              "previewImageUrl": "https://yungying.com/images/preme/12.png"
            }]
          }, {
            headers: {
              "Authorization": "Bearer ".concat(process.env.TOKEN_LINE_CALOCHECK)
            }
          }));

        case 6:
          token = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(checknotisconditions.findAll({
            where: {
              userid: id,
              date: _defineProperty({}, Op.like, "".concat(date, "%"))
            }
          }));

        case 9:
          checknoti = _context8.sent;

          if (!(checknoti.length > 0)) {
            _context8.next = 16;
            break;
          }

          console.log("มี");
          _context8.next = 14;
          return regeneratorRuntime.awrap(checknotisconditions.update({
            overveg: 1,
            date: date
          }, {
            where: {
              userid: id
            }
          }));

        case 14:
          _context8.next = 20;
          break;

        case 16:
          console.log("ไม่มี");
          _context8.next = 19;
          return regeneratorRuntime.awrap(checknotisconditions.create({
            overveg: 1,
            userid: id,
            date: date
          }));

        case 19:
          log = _context8.sent;

        case 20:
          _context8.next = 24;
          break;

        case 22:
          console.log("เคยส่งแล้ว");
          return _context8.abrupt("return");

        case 24:
        case "end":
          return _context8.stop();
      }
    }
  });
}

module.exports = {
  overvegnoti: overvegnoti
};