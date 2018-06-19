const mongoose = require('mongoose')

const url = 'mongodb://xxxx:xxx@ds247499.mlab.com:47499/kk-fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length > 2) {

  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  person
    .save()
    .then(response => {
      console.log('p saved!')
      mongoose.connection.close()
    })

} else {

  Person
    .find({})
    .then(result => {
      result.forEach(p => {
        console.log(p)
      })
      mongoose.connection.close()
    })


}