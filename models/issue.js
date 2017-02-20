const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please give a short title for your issue.']
  },
  nearestBlockNum: {
    type: String,
    required: [true, 'Nearest block number not found.']
  },
  street: {
    type: String,
    required: [true, 'Street not found.']
  },
  problem: {
    type: String,
    required: [true, 'We cannot help you if you do not describe the problem!']
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  solution: {
    type: String,
    required: [true, 'Please describe how you closed the issue.']
  }
})

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue
