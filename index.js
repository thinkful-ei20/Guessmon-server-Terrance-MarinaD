require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const userRouter = require('./users/router');
const questionRouter = require('./questions/router');


const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//parse request body
app.use(express.json());

//Passport strategy config
passport.use(localStrategy);
passport.use(jwtStrategy);

// Mount router
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
