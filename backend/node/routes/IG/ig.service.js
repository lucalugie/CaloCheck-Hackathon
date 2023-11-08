const axios = require('axios');
const dotenv = require('dotenv');
const Users = require('../../model/User');
const API = require('../../constant/API');
const jwt = require('jsonwebtoken');
dotenv.config();

async function getphotostoryFromIG(req, res) {
    try {
        const {name} = req.params;
        const profile = await axios.get(`${API.igPhoto}/${name}`)
        res.json(profile.data)
      } catch (error) {
        res.json("error")
      }
    }
module.exports = {
    getphotostoryFromIG
}
