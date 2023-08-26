require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 9999
const authRoute = require('./routes/authRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const productRoute = require('./routes/productRoutes')
const adminRoute = require('./routes/AdminRoutes')
const cookieParser = require('cookie-parser')
const { mongooseDb_connect } = require('./database/mongooseDb')

app.use(cors({
    origin: ['https://teal-semifreddo-4f16b4.netlify.app', 'http://localhost:5173'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).json({ message: 'Happy hacking.✅' }))

app.use('/api', authRoute)
app.use('/api/v2', categoryRoute)
app.use('/api/v3', productRoute)
app.use('/api/v4', adminRoute)


app.get('/', (req, res) => {
    res.json({ message: 'dark shop dangrous than your mind. alert!' })
})

mongooseDb_connect()

app.listen(port, () => {
    console.log(`✅ Server is running at : http://localhost:${port}`)
})

