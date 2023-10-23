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


         jwt.sign({ userId }, process.env.PRIVATE_KEY, { algorithm: 'HS256' }, (err, tokenid) => {
        if (err) {
            console.error('Error signing JWT:', err);
            return res.status(500).send('Internal Server Error');
        }

        const user = Users.create({
            displayName: profile.data.displayName,
            pictureUrl: profile.data.pictureUrl,
            userlineId: profile.data.userId
        })
        console.log("encoded",tokenid)
        res.cookie('token', tokenid);
        res.status(200).json(user);
});
    }

    catch (error) 
    {
        console.log("error")
        console.log(error)
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

module.exports = {
    login,

}
