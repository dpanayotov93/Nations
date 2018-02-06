/*
 |--------------------------------------
 | Embasy Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const embassySchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  nationId: { type: String, required: true },
  attending: { type: Boolean, required: true },
  guests: Number,
  comments: String
});

module.exports = mongoose.model('Embassy', embassySchema);