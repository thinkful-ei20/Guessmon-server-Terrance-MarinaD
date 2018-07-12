const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models');
const defaultList = require('../startList');
const userList = {
  questionList : defaultList
};

const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const router = express.Router();

const localAuth = passport.authenticate('local', {session: false, failWithError: true});
const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});
// Create a new user
router.post('/', (req, res, next) => {
  const {username, password, email} = req.body;
  
  //Check that all required fields are there
  if(!username) res.status(400).send({'error' : 'Missing Username'});
  if (!password) res.status(400).send({'error' : 'Missing Password'});
  if (!email) res.status(400).send({'error' : 'Missing Email Address'});

  //Check that username and password do not have trailing spaces
  if(username.trim() !== username) res.status(400).send({'error' : 'Username may not have leading or trailing spaces'});
  if(password.trim() !== password) res.status(400).send({'error' : 'Password may not have leading or trailing spaces'});

  //Check that password is at least 6 characters long
  if (password.length < 10) res.status(400).send({'error' : 'Password must be at least 10 characters long'});

  //Hash password
  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        email,
        questionList: defaultList,
        password: digest
      };
      return User.create(newUser);
    })
    .then( result => {
      return User.findById({_id : result.id}, (err, user) => {
        user.questionList = defaultList;
      });
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) res.status(400).json({'error':'The username or email already exists.'});
    });
});

router.post('/login', localAuth, (req, res, next) => {
  const authToken = createAuthToken(req.user);
  res.status(200).json({authToken});
});

router.post('/refresh', jwtAuth, (req, res, next) => {
  const authToken = createAuthToken(req.user);
  res.status(200).json({authToken});
});

function createAuthToken (user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

module.exports = router;