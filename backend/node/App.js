const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const app = express();
const lineRouter = require("./routes/Line/line.routes");
const foodnutritionRounter = require("./routes/Foodnutrition/foodnutrition.routes");
const usersRounter = require("./routes/Users/users.routes");
const usersNutritionRounter = require("./routes/UsersNutrition/UsersNutrition.routes");
const usersGoalsRounter = require("./routes/UsersGoals/UsersGoals.routes");
const historyRounter = require("./routes/Usershistorys/usershistorys.route");
const igRouter = require("./routes/IG/ig.routes");
const notifyRouter = require("./routes/notify/notify.routes");
const photoRouter = require("./routes/Photo/photo.routes");
const { connect, sync } = require("./config/database");
const scheduleNutrition = require('./routes/UsersNutrition/scheduleNutrition');

// const routes = require('./Routes');
const morgan = require("morgan");


const corsOptions = {
  origin: ["http://localhost:4000", "https://calocheck.yungying.com"],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.json({stupid: true});
})

app.post('/proxy-image', async (req, res) => {
  const {imageUrl} = req.body;

  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    
    res.contentType(imageResponse.headers['content-type']);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).send('Error proxying the image.');
  }
});

app.use("/photo", photoRouter); 
app.use("/ig", igRouter);
app.use("/notify", notifyRouter);
app.use("/api", lineRouter);
app.use("/users", usersRounter);
app.use("/foodnutrition", foodnutritionRounter);
app.use("/usersnutrition", usersNutritionRounter);
app.use("/usersgoals", usersGoalsRounter);
app.use("/Calendars", historyRounter);
scheduleNutrition();
//create server
app.listen(4001, () => {
  console.log('Listening on port 4001');
});
