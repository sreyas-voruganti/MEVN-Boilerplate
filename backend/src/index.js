require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AuthRoutes = require('./routes/auth')

const app = express()

// Use Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('MEVN Boilerplate API')
})

// Routes
app.use('/auth', AuthRoutes)

// Connect to DB and start server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(parseInt(process.env.PORT), () =>
      console.log(`Backend started on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.log(err))
