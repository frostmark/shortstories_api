const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const config = require('./config')

/* DATABASE */
const options = {
  useNewUrlParser: true,
  promiseLibrary: Promise,
}
mongoose.connect(
  config.DB_URI,
  options
)
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

require('./models/user')
require('./models/story')

/* SERVER */
const app = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(
  session({
    secret: config.SECRET,
    key: config.KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2147483647,
      secure: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

app.use(cors())

app.get('/api', (req, res) => {
  res.status(200).send('API works')
})

app.use('/api/auth', authRoutes)

app.set('port', config.PORT || 7777)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
