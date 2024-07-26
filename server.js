const dotenv = require('dotenv') //require .env package
dotenv.config() //Loads the environment variables from .env file
const express = require('express')
const mongoose = require('mongoose') //require mongoose package (translator between JS and db)
const methodOverride = require('method-override')
const morgan = require('morgan')

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
app.use(methodOverride('_method'))
app.use(morgan('dev'))

//GET /
app.get('/', async (req, res) => {
  res.render('index.ejs')
})
//GET /fruits
app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find({})
  res.render('fruits/index.ejs', { fruits: allFruits })
})

//GET /fruits/new ---- (form for new fruits)
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

//GET /fruits/:fruitId -- (when looking for individual fruits)
app.get('/fruits/:fruitId', async(req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render("fruits/show.ejs", { fruit:foundFruit } )
})

//POST /fruits --- (when new fruit is submitted)
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect('/fruits')
})

//DELETE /fruits/:fruitId
app.delete('/fruits/:fruitId', async (req, res)=> {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect('/fruits')
})


//GET /fruits/:fruitId/edit
app.get('/fruits/:fruitId/edit', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  console.log(foundFruit)
  res.render('fruits/edit.ejs', { fruit: foundFruit } )
})

//PUT /fruits/:fruitId
app.put('/fruits/:fruitId', async (req, res) => {
  if(req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)

  res.redirect(`/fruits/${req.params.fruitId}`)
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})