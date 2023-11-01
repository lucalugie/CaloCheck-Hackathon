const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();


async function getMember(req, res) {
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
                }
                 );
                if(member && member.gender != null && member.weight != null && member.height != null && member.bmi != null && member.age != null && member.weight > 0 && member.height > 0 && member.bmi > 0 && member.age > 0){
                    return res.status(200).json({type: "login", member});
                }
                else if(member){
                    return res.status(200).json({type: "register", member});
                }else{
                    return res.status(400).json({
                        status: 'Failed',
                        message: 'No user',
                      });
                }
           }else{
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Cant Decode',
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

async function addInfo(req, res) { 
    const {gender,weight,height,bmi,age} = req.body;
    if(!gender || !weight || !height || !bmi || !age){
        console.log("no data")
        return res.status(400).json({
          status: 'Failed',
          message: 'No data',
        });
      }
    if(!req.cookies.token){
        console.log("no token")
        return res.status(400).json({
          status: 'Failed',
          message: 'No data',
        });
      }
    try{ 
            
            jwt.verify(req.cookies.token, process.env.PRIVATE_KEY, async (err, decoded)  => {
            if(decoded){   
            const member = await Users.findOne(
                {
                    where: {
                        userlineId: decoded.userId,
                    },
                }
            )

            if(member){
                const userUpdate = await member.update({
                    gender: gender,
                    weight: weight,
                    height: height,
                    bmi: bmi,
                    age: age
                },{})
                const save = await userUpdate.save();
                return res.status(200).json({type: "login", member: save});
            }

                return res.status(200).json({type: "err", detail: "user not found"});
        }else{
            return res.status(400).json({
                status: 'Failed',
                message: 'No data',
              });
        }
    })
    }
    catch (error) {
        res.status(500).json("error")
    }
} 

module.exports = {
    getMember,
    addInfo
}
