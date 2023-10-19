const express = require('express');
const multer = require("multer");
const utils = require('./utils/utils');

const app = express();
const upload = multer();


app.post('/detect', upload.single('image_file'), async function (req, res) {
    if(!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const boxes = await utils.detect_objects_on_image(req.file.buffer, 0.2);
    res.json(boxes);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
});
