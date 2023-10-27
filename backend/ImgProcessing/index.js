const express = require('express');
const multer = require("multer");
const utils = require('./utils/utils');
const cors = require('cors');
const app = express();
const upload = multer();


const corsOptions = {
    origin: ['http://localhost:3001','http://192.168.0.50:3000'],
    credentials : true
  }
  app.use(cors(corsOptions));

app.post('/detect', upload.single('image_file'), async function (req, res) {
    if(!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const boxes = await utils.detect_objects_on_image(req.file.buffer, 0.2);
    res.json(boxes);
});

app.listen(3002, () => {
    console.log('Server is listening on port 3002')
});
