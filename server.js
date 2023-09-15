require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 9999
const authRoute = require('./routes/authRoutes')
const orderRoute = require('./routes/clientOrderRoutes')
const customerRoute = require('./routes/CustomerRoutes')
const clientHomeRoute = require('./routes/clientHomeRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const productRoute = require('./routes/productRoutes')
const adminRoute = require('./routes/AdminRoutes')
const cookieParser = require('cookie-parser')
const { mongooseDb_connect } = require('./database/mongooseDb')


const allowedOrigins = ['https://stellular-otter-74d475.netlify.app', 'https://teal-semifreddo-4f16b4.netlify.app'];


app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.status(200).json({ message: 'Happy hacking youth..✅' }))

app.use('/api', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/customer', customerRoute)
app.use('/api/home', clientHomeRoute)
app.use('/api/v2', categoryRoute)
app.use('/api/v3', productRoute)
app.use('/api/v4', adminRoute)


mongooseDb_connect()

app.listen(port, () => {
    console.log(`✅ Server is running at : http://localhost:${port}`)
})

