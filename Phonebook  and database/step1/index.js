const express = require('express')
const path = require('path')
const app = express()
require ('dotenv').config()
const PORT = process.env.PORT || 3001

 const person = require('./Models/persons')

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
  person.find({}).then(persons => {
    res.json(persons)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})