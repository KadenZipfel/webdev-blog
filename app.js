const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const indexRoutes = require('./routes/index');

app.use(indexRoutes);

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log('Server is running');
});