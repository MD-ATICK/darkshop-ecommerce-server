require('dotenv').config()
const { default: mongoose } = require("mongoose")


exports.mongooseDb_connect = async () => {

    try {
        const { connection } = mongoose.connect(process.env.database_url, { dbName: 'dshop-ecommerce-web' })
        console.log(`✅ mongoose connect at :`, connection.host)
    } catch (error) {
        console.log('⛔ datebase connect failed.')
    }
}

