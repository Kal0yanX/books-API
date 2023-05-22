const books = require('express').Router()
const Book = require('../models/books')

//FIND books
books.get('/', async (req, res) => {
    try {
        const book = await Book.find()
        res.json(book)
    } catch (error) {
        console.log('error retreiving book', error)
        res.json({ message: 'error retreiving book' })
    }
})

//FIND book by ID
books.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id)
        res.json(book)
        
    } catch (error) {
        console.log('error retreiving book', error)
        res.status(404).json({ message: `error retreiving book with id ${id}` })
    }
})

//POST a new book
books.post('/', async (req, res) => {
    try {
        const book = await new Book(req.body).save()
        res.json(book)
        
    } catch (error) {
        console.log('error creating book', error)
        res.status(500).json({ message: `error creating book` })
    }
    
})

//DELETE a book
//works in POSTMAN when placing http://localhost:3000/books/id number here
books.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findByIdAndDelete(id)
        if (!book)  {
            res.status(404).json({ message: 'book doesn\'t exist' })
        } else {
            res.json({ message: 'book deleted' })
        }
    } catch (error) {
        console.log(error)
        res.json({ message: 'error deleting book' })
    }
})

// SEED a database
books.get('/data/seed', async (req, res) => {
  const data = [
    {
      title: "The Shinobi Initiative",
      description: "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg"
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg"
    },
    {
      title: "The Annals of Arathrae",
      description: "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg"
    },
    {
      title: "Wâˆ€RP",
      description: "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg"
    },
]
    await Book.insertMany(data)
      res.status(303).redirect('/book')
})


// EXPORT
module.exports = books