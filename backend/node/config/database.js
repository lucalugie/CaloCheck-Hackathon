const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    'calocheck', // Database name
    'premesocute', // Username
    'nodeproject9999', // Password
    {
      host: '61.7.143.204', // Connect to your local database otherwise use 61.7.143.204
      dialect: 'mysql' // Tell sequelize to use Postgres
    }
  );
  async function connect() {
    try {
      await sequelize.authenticate();
      console.log('Connection established successfully');
    } 
    catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  

async function sync() { 
    try {
    await sequelize.sync();
    console.log(
      'Connection synced successfully'
    );
  } catch (error) {
    console.error(
      'Unable to sync to the database:',
      error
); }
}

async function relation () { 
try {
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.User = sequelize.import('./model/users');
  db.foodnutrition = sequelize.import('../model/foodnutrition');
  db.Usershistory = sequelize.import('../model/Usershistory');
  db.Usershistory.hasMany(
    db.User,
    {
      foreignKey:{name:'userlineid',fild:'userlineId'}
    },
    db.foodnutrition,
    {
      foreignKey:{name:'idfood',fild:'idfood'}
    },
    
    );
    db.Usershistory.belongsTo(db.User, { foreignKey: 'userlineid' });
    db.Usershistory.belongsTo(db.foodnutrition, { foreignKey: 'idfood' });
} catch (error) {
  console.log("error from database");
}
}

module.exports = {
    sequelize,
    connect,
    sync
}