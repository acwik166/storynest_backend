const passport = require('passport')
const User = require('../models/User')

passport.use(User.createStrategy())

module.exports = passport