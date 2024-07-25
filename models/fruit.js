//always singular when creating model .js file

const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
})

//create model
const Fruit = mongoose.model('Fruit', fruitSchema)

//need to export model to use in route
module.exports = Fruit