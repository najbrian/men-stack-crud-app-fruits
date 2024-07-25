const dotenv = require('dotenv') //require .env package
dotenv.config() //Loads the environment variables from .env file

const express = require('express')

const mongoose = require('mongoose') //require mongoose package (translator between JS and db)

const app = express()

//connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI)
//Log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})


//Import the Fruit model
const Fruit = require('./models/fruit.js')

//middleware
app.use(express.urlencoded({ extended: false }))

//GET /
app.get ('/', async (req, res) => {
  res.render('index.ejs')
})
//GET /fruits
app.get ('/fruits', (req, res) => {
  res.send ('Welcome to the index page!')
})

//GET /fruits/new ---- (form for new fruits)
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

//POST /fruits --- (when new fruit is submitted)
app.post('/fruits', async (req,res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect('/fruits/new')
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})