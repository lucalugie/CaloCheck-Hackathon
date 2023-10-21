const axios = require('axios');
const dotenv = require('dotenv');
const API = require('../../constant/API');
const Users = require('../../model/User');
dotenv.config();

async function postCode(req, res) {
    try {
        const {code} = req.body
        
        axios.post(API.token, {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": process.env.REDIRECT_URI,
            "client_id": process.env.CLIENT_ID,
            "client_secret": process.env.CLIENT_SECRET
        }, 
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then((response) => {
        const {data} = response
        const {access_token} = data
        axios.get(API.profile, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then((response) => {
        const {data} = response
        const {displayName, userId} = data
        Users.create({
            userlineId: userId,
            displayName: displayName
        })
        res.status(200).json("Succcess")
        })
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error})
    }

}
module.exports = {
    postCode
}
