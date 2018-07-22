const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String,
  token: Number
})

module.exports = mongoose.model('Post', PostSchema)
