// dependencies
const mongoose = require('mongoose')
//creating shorthand for the Schema constructor
const { Schema } = mongoose


// schema
const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    year: { type: Number },
    quantity: { type: Number},
    imageURL: { type: String, default: 'http://placehold.it/500x500.png' },
})

// model and export
module.exports = mongoose.model('Book', bookSchema)

