const dotenv = require('dotenv');
const Users = require('../../model/User');
const Photos = require('../../model/photos');
const jwt = require('jsonwebtoken');
const multer = require('multer');
dotenv.config();

async function sendPhotoforAi(req, res) {
    if(!req.cookies.token){
        return res.status(400).json({
          status: 'Failed',
          message: 'No Token',
        });
      }
    try {  
          jwt.verify(req.cookies.token, process.env.PRIVATE_KEY, async (err, decoded)  => {
           if(decoded){
            const member = await Users.findOne(
                {
                    where: {
                        userlineId: decoded.userId,
                    },
                });
                if(member){
                    await Photos.create({
                        userlineid: decoded.userId,
                        photo: req.file.path,
                        namefood: req.params.nameFood,
                    })
                    res.status(200).json({
                        status: 'Success',
                    })
                }
                 
           }
           
       })
        
    } 
    catch (error) 
    {
        res.status(500).json("error")
    }
}
module.exports = {
    sendPhotoforAi
}
