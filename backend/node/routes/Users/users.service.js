const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();


async function getMember(req, res) {

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
                 console.log(member)
                if(member && member.gender != null && member.weight != null && member.height != null && member.cal != null &&  member.age != null){
                    console.log("send type login")
                    return res.status(200).json({type: "login", member});
                }
                else if(member && member.gender == null && member.weight == null && member.height == null && member.cal == null){
                    console.log("send type register")
                    return res.status(200).json({type: "register", member});
                }
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

async function addInfo(req, res) { 
    try{
        const {gender,weight,height,bmi,age,cal} = req.body;
        jwt.verify(req.cookies.token, process.env.PRIVATE_KEY, async (err, decoded)  => {
        if(decoded){
            console.log("decoded", decoded.userId)
        const member = await Users.findOne(
            {
                where: {
                    userlineId: decoded.userId,
                },
            }
        )
        
        if(member){
            member.gender = gender;
            member.weight = weight;
            member.height = height;
            member.bmi = bmi;
            member.age = age;
            member.cal = cal;
            await member.save();
            return res.status(200).json({type: "login", member});
        }
        else{
            return res.status(200).json({type: "register", member});
        }
        }
    })
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
} 

module.exports = {
    getMember,
    addInfo
}
