const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();


async function getMember(req, res) {
    console.log("cookie",req.cookies)
    try {
        if(!req.cookies.token){
            console.log("no token")
            return res.status(400).json({
              status: 'Failed',
              message: 'No data',
            });
          }
          jwt.verify(req.cookies.token, process.env.PRIVATE_KEY, async (err, decoded)  => {
           if(decoded){
            const member = await Users.findOne(
                {
                    where: {
                        userlineId: decoded.userId,
                    },
                }
                 );
      
            return res.status(200).json(member);
           }
            else{
                console.log("no member")
                return res.status(400).json({
                    status: 'Failed',
                    message: 'No data',
                  });
            }
           
       })
        
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json(error)
    }
    
}

module.exports = {
    getMember,
}
