const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  nearestBlockNum: {
    type: String,
    required: [true, 'Nearest block number not found.']
  },
  street: {
    type: String,
    required: [true, 'Street not found.']
  },
  Problem: {
    type: String,
    required: [true, 'We cannot help you if you do not describe the problem!']
  },
  shareWithPublic: {
    type: Boolean,
    required: true
  },
  reporter: {
    type: String,
    enum: ['Yourself', 'Anonymous'],
    default: 'Yourself'
  }
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request
