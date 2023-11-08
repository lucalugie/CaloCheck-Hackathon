const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();

async function getCookieByLIFF(req, res) {
    try{
        if(!req.body.token) return res.json("can't get token")

        const {token} = req.body;

        const profile = await axios.get(API.profile, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const userId = profile.data.userId;




        const member = await Users.findOne(
            {
                where: {
                    userlineId: userId,
                },
            }
        )   

         jwt.sign({ userId }, process.env.PRIVATE_KEY,{ algorithm: 'HS256', expiresIn: "5 Days" }, async (err, tokenid)  => {


            if(!member){
                const user = await Users.create({
                    displayName: profile.data.displayName,
                    pictureUrl: profile.data.pictureUrl,
                    userlineId: profile.data.userId,
                })
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
                            httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "register", member: user});
            }else if(member.gender != null && member.weight != null && member.height != null && member.age != null && member.weight > 0 && member.height > 0 && member.age > 0){
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
							httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "login", member: member});
            }else{
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
							httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "register", member: member});
            }

         });

    }catch(err){
        res.json("err")
    }
}

//Login 
async function login(req, res) {

    try {
        const {code} = req.body
        const token = await axios.post(API.token,{
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'redirect_uri': process.env.REDIRECT_URI
        }, 
        {headers: {'content-type': 'application/x-www-form-urlencoded'}})

    
        const profile = await axios.get(API.profile, {
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    
        

        const userId = profile.data.userId;




        const member = await Users.findOne(
            {
                where: {
                    userlineId: userId,
                },
            }
        )   

         jwt.sign({ userId }, process.env.PRIVATE_KEY,{ algorithm: 'HS256', expiresIn: "5 Days" }, async (err, tokenid)  => {


            if(!member){
                const user = await Users.create({
                    displayName: profile.data.displayName,
                    pictureUrl: profile.data.pictureUrl,
                    userlineId: profile.data.userId,
                })
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
							httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "register", member: user});
            }else if(member.gender != null && member.weight != null && member.height != null && member.age != null && member.weight > 0 && member.height > 0 && member.age > 0){
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
							httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "login", member: member});
            }else{
                res.clearCookie('token',{ domain: '.yungying.com'}).cookie('token', tokenid,{
							domain: '.yungying.com',
							httpOnly: true,
                            secure: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
                 }).status(200).json({type: "register", member: member});
            }
                


        // if(!member){
        // const user = await Users.create({
        //     displayName: profile.data.displayName,
        //     pictureUrl: profile.data.pictureUrl,
        //     userlineId: profile.data.userId,
        // })
        // // if(req.cookies.token==null){
        //     res.cookie('token', tokenid,{
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'lax',
        //         expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
        //     }).status(200).json({type: "register", member: user});
        //     // }
        //     // res.status(200).json({type: "register", member: user});
        // }
        // else if(member)
        // {
        //     if(member.gender != null && member.weight != null && member.height != null && member.age != null && member.weight > 0 && member.height > 0 && member.age > 0)
        // {
        //     // if(req.cookies.token==null){
        //     res.cookie('token', tokenid,{
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'lax',
        //         expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
        //       }).status(200).json({type: "login", member});
        //     // }
        //     // res.status(200).json({type: "login", member});
        // }
        //     else if(member.gender == null || member.weight == null || member.height == null || member.age == null || member.weight == 0 || member.height == 0 || member.age == 0)
        // {
        //     // if(req.cookies.token==null){
        //     res.cookie('token', tokenid,{
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'lax',
        //         expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
        //     }).status(200).json({type: "register", member});
        //     // }
        //     // res.status(200).json({type: "register", member});
        // }

        // else {
        //     // if(req.cookies.token==null){
        //     res.cookie('token', tokenid,{
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'lax',
        //         expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
        //     }).status(200).json({type: "register", member});
        //     // }
        //     // res.status(200).json({type: "register", member});
        // }

        // }

         });

        
        
    }catch (error){
        console.log("error try api ")
        res.status(500).json("error")
    }
}


async function checktoken(req, res) {
    try {
        if(req.cookies.token){
            console.log("no token")
            return res.status(400).json({
              status: "havetoken",
            });
          }
          else{
            return res.status(200).json({status: "notoken"});
          }
    }
    catch (error) 
    {
        res.status(500).json("error")
    }
}

async function loginagain(req, res) {
    try {
        //เอา userID ออกมา
        const profile = await axios.get(API.profile, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        //หาข้อมูลในตาราง ว่ามีuserID นี้หรือไม่
        const userId = profile.data.userId;
        console.log("userId",userId)
        const member = await Users.findOne(
            {
                where: {
                    userlineId: userId,
                },
            }
        )
         //แปลงuserID เป็นรหัสลับ
         jwt.sign({ userId }, process.env.PRIVATE_KEY,{ algorithm: 'HS256', expiresIn: "5 Days" }, async (err, tokenid)  => {
        
        
        
            if (err) {
            console.error('Error signing JWT:');
            return res.status(500).send('Internal Server Error');
        }
        //เช็คเงื่อนไขต่างๆ
        if(!member){
            console.log("1")
        const user = await Users.create({
            displayName: profile.data.displayName,
            pictureUrl: profile.data.pictureUrl,
            userlineId: profile.data.userId,
        })
        console.log("user",user)
        if(req.cookies.token==null){
            res.cookie('token', tokenid,{
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
            }).status(200).json({type: "register", member: user});
            }
            res.status(200).json({type: "register", member: user});
        }
        else if(member)
        {
            if(member.gender != null && member.weight != null && member.height != null && member.age != null && member.weight > 0 && member.height > 0 && member.age > 0)
        {
            console.log("2")
            if(req.cookies.token==null){
            res.cookie('token', tokenid,{
				domain: '.yungying.com',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
              }).status(200).json({type: "login", member});
            }
            res.status(200).json({type: "login", member});
        }
            else if(member.gender == null || member.weight == null || member.height == null || member.age == null || member.weight == 0 || member.height == 0 || member.age == 0)
        {
            console.log("3")
            if(req.cookies.token==null){
            res.cookie('token', tokenid,{
				domain: '.yungying.com',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
            }).status(200).json({type: "register", member});
            }
            res.status(200).json({type: "register", member});
        }

        else {
            console.log("4")
            if(req.cookies.token==null){
            res.cookie('token', tokenid,{
				domain: '.yungying.com',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
            }).status(200).json({type: "register", member});
            }
            res.status(200).json({type: "register", member});
        }

        }
        

        



         });
        
        
    }

    catch (error) 
    {
        res.status(500).json("error")
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
            'Unable to sync to the database: ',
            error
        );
}

}

async function getMember(req, res) {
    if(!req.cookies.token){
        return res.status(400).json({
          status: 'Failed',
          message: 'No data',
        });
      }
         jwt.verify(req.cookies.token, process.env.JWT_SECRET, async (err, decoded) => {
          if(decoded){
            const member = await User.findOne({username : decoded.data}, {username: 1, steam: 1, discord: 1, _id: 0});
            if(!member){
              return res.status(400).json({
                status: 'Failed'
              });
            }else{
              return res.status(200).json({
              status: 'Success',
              data: member
            })
            }
          }else{
            return res.status(400).json({
              status: 'Failed',
              message: err
            })
          }
      })
}

async function clearCookie(req, res) {

    res.clearCookie('token',{domain:'.yungying.com'});

    return res.status(200).json({
        status: true
    })
}


module.exports = {
    login,
    getMember,
    loginagain,
    checktoken,
    clearCookie,
    getCookieByLIFF

}
