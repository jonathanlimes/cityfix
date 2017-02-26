const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please give a short title for your issue.']
  },
  address: {
    type: String,
    required: [true, 'Address not found.']
  },
  problem: {
    type: String,
    required: [true, 'We cannot help you if you do not describe the problem!']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFixed: {
    type: Boolean,
    default: false
  },
})

// issueSchema.statics.genLat = function (address) {
//   var results = geocoder.geocode(address, function (err, output) {
//     console.log(output.results[0].geometry.location.lat)
//     return output.results[0].geometry.location.lat
//   })
// }
//
// issueSchema.statics.genLng = function (address) {
//   geocoder.geocode(address, function (err, output) {
//     console.log(output.results[0].geometry.location.lng)
//     return output.results[0].geometry.location.lng
//   })
// }

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue
