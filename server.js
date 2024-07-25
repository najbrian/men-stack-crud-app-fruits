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

//GET /
app.get ('/', async (req, res) => {
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})