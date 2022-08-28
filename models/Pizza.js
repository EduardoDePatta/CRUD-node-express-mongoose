const mongoose = require('mongoose')

const Pizza = mongoose.model('Pizza', {
    flavor: String, 
    price: Number,
    cost: Number,
    stuffedCrust: Boolean,
})

module.exports = Pizza