const axios = require('axios');
const dotenv = require('dotenv');
const API = require('../../constant/API');
const Users = require('../../model/User');
dotenv.config();

async function postCode(req, res) {
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

        
        if(profile){
            const user = await Users.create({
                userlineId: profile.data.userId,
                displayName: profile.data.displayName,
                pictureUrl: profile.data.pictureUrl,
                createdAt: new Date()
            })
            res.json("success")
            res.status(201).json(user);
    
        }


    } 
    catch (error) {
        res.status(500).json(error)
    }

}
module.exports = {
    postCode
}
