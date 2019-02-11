const express = require('express')
const bodyParser = require('body-parser') 
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

const cors = require('cors')

app.use(cors())


let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "045 1236543",

    },
    {
        id: 2,
        name: "Arto Järvinen!",
        number: "041-21423123",
    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "040-4323234",
    },
    {
        id: 4,
        name: "Martti Tienari!!!",
        number: "09-784232"
    }
]

app.use(bodyParser.json())

const generateId = () => {
  const maxId =
    notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
  return maxId + 1
}

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })



app.get('/info',(req, res) => {
    y = notes.length
    a = new Date();
    c = '<div>Puhelinluettelossa on ' + y + 'ihmisen numerot' + 
        '<p>' + a + '</p></div>'  

    

    res.send(c)
})
app.get('/api/persons',(req, res) => {
   res.json(notes)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.content === "" || body.number === "") {
        return res.status(400).json({ error: 'Nimi puuttuu tai numero puuttuu' })
      } 
      
      else if (notes.find(note => note.name === body.content)) {
          return res.status(400).json({ error: 'Nimi löytyy jo'

      })
    }

    const note = {
      name: body.content,
      number: body.number,
      id: generateId(),
    }
  
    notes = notes.concat(note)
    
    res.json(note)
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)