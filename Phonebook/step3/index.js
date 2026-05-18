const express = require('express')
const app = express()
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
  res.send(person)
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

app.listen(3003, () => {
    console.log('Server running on port 3003')
})