const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();

//Login 
async function login(req, res) {
    try {
        const {code} = req.body
        const token = await axios.post(API.token, {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
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
       
        //,{ algorithm: 'HS256' } ,{expiresIn: "1h"}

        console.log("userId",userId)
         jwt.sign({ userId }, process.env.PRIVATE_KEY,{ algorithm: 'HS256', expiresIn: "5 Days" }, async (err, tokenid)  => {
        if (err) {
            console.error('Error signing JWT:', err);
            return res.status(500).send('Internal Server Error');
        }
        if(!member){
        const user = await Users.create({
            displayName: profile.data.displayName,
            pictureUrl: profile.data.pictureUrl,
            userlineId: profile.data.userId
        })
        res.cookie('token', tokenid,{
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
          }).status(200).json(user);
        }else{
            res.cookie('token', tokenid,{
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                expires: new Date(Date.now() + 60 * 5* 24 * 60 * 1000)
              }).status(200).json(member);
        }
        console.log("encoded(Time) ",tokenid)


    });
        
        
    }

    catch (error) 
    {
        console.log("error")
        res.status(500).json(error)
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

module.exports = {
    login,
    getMember

}
