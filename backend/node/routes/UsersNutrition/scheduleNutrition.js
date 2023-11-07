const cron = require("node-cron");
const UsersNutrition = require("../../model/UsersNutrition");
const Users = require("../../model/User");


function scheduleNutrition() {
// Schedule at midnight every day   //  every 1 min//"*/1 * * * *"   //"0 0 * * *"
cron.schedule("0 0 * * *", async () => {  
  try {
 
    const allUsers = await Users.findAll();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    for (const user of allUsers) {
      await UsersNutrition.create({
        userlineid: user.userlineId, 
        createdAt: currentDate,
        ach_kcal: 0,
        ach_g: 0,
        ach_protein: 0,
        ach_fat: 0,
        ach_salt: 0,
        ach_sugar: 0,
        ach_veg: 0,
        ach_carb: 0,
      });
    }

    console.log("Daily records created for all users.");
  } catch (error) {
    console.error("Error creating daily records:", error);
  }
});
}
module.exports = scheduleNutrition;
