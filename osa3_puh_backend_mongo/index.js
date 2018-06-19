const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

morgan('tiny', {
  skip: function (req, res) { return res.statusCode < 400 }
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)

const formatPerson = (p) => {
  return {
    name: p.name,
    number: p.number,
    id: p._id
  }
}


app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(formatPerson))
    })
})

app.get('/info', (req, res) => {
  const date = new Date()

  Person
    .find({})
    .then(persons => {
      res.send('<p>puhelinluettelossa on ' + persons.length + ' henkilöä</p>' +
        '<p>' + date + '</p>')
    })

})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(formatPerson(person))
      } else {
        response.json({message: 'not found'})
      }
    })
    .catch(error => {
      console.log(error)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return res.status(400).json({error: 'nimi puuttuu'})
  }

  if (body.number === undefined) {
    return res.status(400).json({error: 'numero puuttuu'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    // .then(savedPerson => {
    //   response.json(formatPerson(savedPerson))
    // })
    // .then(savedPerson => {
    //   return formatPerson(savedPerson)
    // })
    // .then(savedAndFormattedPerson => {
    //   response.json(savedAndFormattedPerson)
    // })
})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(formaPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

