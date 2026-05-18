const express = require('express')
const path = require('path')
const app = express()
require ('dotenv').config()
const PORT = process.env.PORT || 3001

const Person = require('./Models/persons')

app.use(express.static('dist'))
app.use(express.json())

const cors = require('cors')
app.use(cors())
const morgan = require('morgan')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


app.use(morgan('tiny'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    if (persons) {
      res.json(persons)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({ error: 'internal server error' })
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({ error: 'fail to save person' })
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: 'malformatted ID' })
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})