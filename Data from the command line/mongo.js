const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://galuakwaat_db_user:${password}@ac-dcaok4p-shard-00-00.t7zaux8.mongodb.net:27017,ac-dcaok4p-shard-00-01.t7zaux8.mongodb.net:27017,ac-dcaok4p-shard-00-02.t7zaux8.mongodb.net:27017/dataline?ssl=true&replicaSet=atlas-t11kgr-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 }).then(result => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})