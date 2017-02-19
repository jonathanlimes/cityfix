const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, 'List title must be at least 5 characters long.']
  },
  color: String,
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }]
})

const List = mongoose.model('List', listSchema)
module.exports = List
