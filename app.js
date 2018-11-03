const express = require('express');
const keys = require('./keys');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

// Setup database
mongoose.connect('mongodb://localhost/webdev-blog') || mongoose.connect(keys.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Passport config
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  maxAge: 365 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

app.use(indexRoutes);
app.use('/admin', adminRoutes);

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
  console.log('Server is running');
});