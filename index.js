
  let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    },
    {
      "name": "Testi",
      "number": "456",
      "id": 5
    }
  ]


const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('<h1>Moi</h1>')
})

app.get('/info', (req, res) => {
  const infotext = `puhelinluettelossa ${persons.length} henkilön tiedot`
  const timestamp = new Date()
  text = `<p>${infotext}</p><p>${timestamp}</p>`
  res.send(text)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const single_person = persons.find(person => person.id === id)
  if (single_person) {
      res.json(single_person)
  } else {
    res.status(404).end()
  }
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  console.log(body)

  if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  }

  if (body.number === undefined) {
    return res.status(400).json({error: 'number missing'})
  }

  if (persons.find(person => person.name === body.name) !== undefined) {
    return res.status(400).json({error: 'name already in list'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000)
  }
  console.log(person)

  persons = persons.concat(person)
  res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
