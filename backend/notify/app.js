const automation = require('./automation/automation');
const automonths = require('./automation/automationThreeMonth');
console.log("start")
setInterval(() => {
    automation.Message();

},1000)

// automonths.MessageAutoMonth();


