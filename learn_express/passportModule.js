//const express = require('express');
//const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Налаштування стратегії Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "test" && password === "secret") {
      return done(null, {id: 1, name: "Test"});
    } else {
      return done(null, false, { message: 'Неправильні дані.' });
    }
  }
));

// Серіалізація та десеріалізація користувача
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Знайти користувача за ID
  // Припустимо, що ми знайшли користувача
  done(null, {id: 1, name: "Test"});
});

const isPassportAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};

module.exports = {isPassportAuthenticated}