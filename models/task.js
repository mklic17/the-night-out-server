var db = require('../config/db');
var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');

var taskSchema = db.Schema({
  age: String,
  category: String,
  fullDesc: String,
  fullDesc_text: String,
  likes: Number,
  location: String,
  location_text: String,
  price: String,
  summary: String,
  location_text: String,
  time: String
});

taskSchema.pre('save', function(next) {
     this.fullDesc_text = htmlToText.fromString(this.fullDesc);
     this.fullDesc = sanitizeHtml(this.fullDesc);

     this.location_text = htmlToText.fromString(this.location);
     this.location = sanitizeHtml(this.location);

     this.summary_text = htmlToText.fromString(this.summary);
     this.summary = sanitizeHtml(this.summary);
     next();

});

var Task = db.model('Task', taskSchema);

module.exports = Task;
