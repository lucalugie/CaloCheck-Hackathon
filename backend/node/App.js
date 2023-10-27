const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const lineRouter = require("./routes/Line/line.routes");
const foodnutritionRounter = require("./routes/Foodnutrition/foodnutrition.routes");
const usersRounter = require("./routes/Users/users.routes");
const usersNutritionRounter = require("./routes/UsersNutrition/UsersNutrition.routes");
const { connect, sync } = require("./config/database");

// const routes = require('./Routes');
const morgan = require("morgan");

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  
};

// Connect to the database
async function initializeDatabase() {
  await connect();
  await sync();
}
initializeDatabase();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/products', routes);

app.use("/api", lineRouter);
app.use("/users", usersRounter);
app.use("/foodnutrition", foodnutritionRounter);
app.use("/usersnutrition", usersNutritionRounter);
//create server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
