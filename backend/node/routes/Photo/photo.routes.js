const express = require('express');
const service = require('./photo.service');
const photoRouter = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname+Date.now())
    }
})

var upload = multer({ storage: storage })

photoRouter.post('/sendName/:nameFood', upload.single('image_file'), async (req, res) => {
    if(req.file.originalname.includes(".")){
        return await service.sendPhotoforAi(req, res);
    }else{
        req.file.originalname = req.file.originalname + ".png";
        return await service.sendPhotoforAi(req, res);
    }
});
module.exports = photoRouter;