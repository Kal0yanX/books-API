const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bookController = require('./controllers/book')
const app = express()

//middlewares and config
app.use(express.json())
app.use(cors())

//routes
app.use('/books', bookController)

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

    
const PORT = process.env.PORT

 // Listening on port verification
app.listen(PORT, console.log(`listening on port ${PORT}`))

//Getting the root index to say "Hello world"
app.get('/', (req, res) => {
    res.send('Hello world')
  })

module.exports = app