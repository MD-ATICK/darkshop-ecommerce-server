const { responseReturn } = require("../utils/responseReturn")


exports.isRoleAccessable = (...roles) => {
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) return responseReturn(res, 222, { errro: '⛔ user authorized access.' })

        return next()

    }
}