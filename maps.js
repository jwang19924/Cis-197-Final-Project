var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_2qbdph92:s7dh5sesuodh0nrvjtivjb91o6@ds115071.mlab.com:15071/heroku_2qbdph92');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var mapSchema = new Schema({
  mapname: { type: String, required: true, unique: true },
  mapdata: { type: [], required: true }
});

mapSchema.statics.addMap = function(mapname, mapData, cb) {
  var newMap = new this({ mapname: mapname, mapdata: mapdata});
  newMap.save(cb);
}





module.exports = mongoose.model('Maps', mapSchema);