const adminModel = require("../models/adminModal")
const { responseReturn } = require("../utils/responseReturn")
const jwt = require('jsonwebtoken')


exports.isUserAuthorize = async (req, res, next) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return responseReturn(res, 222, { error: 'user unauthorized. plesase login.' })

    const token = bearerToken.split(" ")[1]

    const user = await jwt.verify(token, process.env.login_token_secret, async (err, verifiedJwt) => {
        if (err) return responseReturn(res, 223, { error: 'jwt token expried' })
        return verifiedJwt;
    })

    req.user = user
    next()
}
