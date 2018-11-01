const express = require('express');
const keys = require('./keys');
const mongoose = require('mongoose');

const app = express();

// Setup database
mongoose.connect('mongodb://localhost/webdev-blog') || mongoose.connect(keys.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const indexRoutes = require('./routes/index');

app.use(indexRoutes);

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log('Server is running');
});