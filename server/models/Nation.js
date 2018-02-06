/*
 |--------------------------------------
 | Nation Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nationSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  creationDatetime: { type: Date, required: true },
  // endDatetime: { type: Date, required: true },
  description: String,
  viewPublic: { type: Boolean, required: true }
});

module.exports = mongoose.model('Nation', nationSchema);