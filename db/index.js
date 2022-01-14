const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost/blogdb')
    console.log('mongodb connected')
}

module.exports = {connectDB};