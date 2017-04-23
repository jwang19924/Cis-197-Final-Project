var mongoose = require('mongoose');
mongoose.createConnection('mongodb://heroku_2qbdph92:s7dh5sesuodh0nrvjtivjb91o6@ds115071.mlab.com:15071/heroku_2qbdph92');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mapnames: []
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.addUser = function(username, password, mapnames, cb) {
  var newUser = new this({ username: username, password: password, mapnames: mapnames});
  newUser.save(cb);
}

userSchema.statics.checkIfLegit = function(username, password, mapnames, cb) {
  this.findOne({ username: username }, function(err, user) {
    if (!user) cb('no user');
    else {
      bcrypt.compare(password, user.password, function(err, isRight) {
        if (err) return cb(err);
        cb(null, isRight);
      });
    };
  });
}

module.exports = mongoose.model('User', userSchema);