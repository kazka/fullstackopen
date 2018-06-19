const mongoose = require('mongoose')

const url = 'mongodb://kk-fullstack:kazka123@ds247499.mlab.com:47499/kk-fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
