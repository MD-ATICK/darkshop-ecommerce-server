require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.generateToken = async (data) => {
    const token = await jwt.sign(data, process.env.login_token_secret, { expiresIn: process.env.login_token_expired })
    return token;
}