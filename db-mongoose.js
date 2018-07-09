const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('./config');

function dbConnect(url = DATABASE_URL) {
  return mongoose.connect(url)
    .then(url => console.log(`connected to database at ${url.connection.host}`))
    .catch(err => {
      console.error('Mongoose failed to connect');
      console.error(err);
    });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbGet() {
  return mongoose;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};
