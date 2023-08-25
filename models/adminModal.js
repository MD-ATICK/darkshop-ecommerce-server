const { default: mongoose } = require("mongoose");


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    role: {
        type: String,
        default: 'admin'
    },
}, { timestamps: true })

const adminModel = mongoose.model('admins', adminSchema)
module.exports = adminModel;