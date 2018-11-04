const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  date: String,
  image: String
});

articleSchema.plugin(passportLocalMongoose);

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;