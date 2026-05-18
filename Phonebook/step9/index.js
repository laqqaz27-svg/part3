const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let person = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(person)
})
app.get('/info', (req, res) => {
    res.send('phonebook has info for ' + person.length + ' people. <br><br>' + new Date())
})
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id   

  const foundPerson = person.find(p => p.id === id)

  if (foundPerson) {
    res.json(foundPerson)
  } else {
    res.status(404).send('Person not found')
  }
})
app.post('/api/persons', (req, res) => {
  const body = req.body
  const generatedId = () => {
    return Math.floor(Math.random() * 1000000)
  }
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameExists = person.some(p => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: generatedId().toString(),
    name: body.name,
    number: body.number
  }

  person = person.concat(newPerson)

  res.status(201).json(newPerson)
})
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const exists = person.some(p => p.id === id)

  if (!exists) {
    return res.status(404).send('Person not found')
  }

  person = person.filter(p => p.id !== id)

  res.status(204).end()
})


app.listen(3001, () => {
    console.log('Server running on port 3001')
})