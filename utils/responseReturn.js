

module.exports.responseReturn = (res, status, data) => {
    return res.status(status).json(data)
}