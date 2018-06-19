const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send('<p>puhelinluettelossa on ' + count + 'henkilöä</p>' +
    '<p>' + date + '</p>')
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 10000)
  const person = req.body

  if (person.name === undefined) {
    return res.status(400).json({error: 'nimi puuttuu'})
  }

  if (person.number === undefined) {
    return res.status(400).json({error: 'numero puuttuu'})
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({error: 'on olemassa'})
  }

  person.id = id

  persons = persons.concat(person)

  res.json(person)
})