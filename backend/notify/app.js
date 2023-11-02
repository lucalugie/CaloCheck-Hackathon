const automation = require('./automation/automation');
const automonths = require('./automation/automationThreeMonth');


setInterval(() => {
    automation.Message();

},1000)

// automonths.MessageAutoMonth();


