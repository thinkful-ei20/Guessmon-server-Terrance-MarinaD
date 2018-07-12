require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');

const { TEST_DATABASE_URL, JWT_SECRET, JWT_EXPIRY } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');
const User = require('../users/models');
const defaultList = require('../startList');
const { app } = require('../index');
const jwt = require('jsonwebtoken');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
// process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

let token;
let userId;

before(function () {
  dbConnect(TEST_DATABASE_URL).then(
    User.deleteMany({})
  );
});

beforeEach(function () {
  return User.create({
    username: 'testuser10',
    password: '$2a$10$nfuXnzlT3tpycpL3dbV29eXduOg6IStnGt0KMLFV8h1sY15A0Rgle',
    email: 'test1234@testing.com',
    questionList: defaultList
  }).then(user => {
    userId = user.id;

    token = jwt.sign({ user }, JWT_SECRET, {
      subject: user.username,
      expiresIn: JWT_EXPIRY
    });
  });
});

afterEach(function () {
  return User.deleteMany({});
});

after(function () {
  return dbDisconnect();
});

describe('Mocha and Chai', function () {
  it('should be properly setup', function () {
    expect(true).to.be.true;
  });
  it('Node ENV should be test', function () {
    expect(process.env.NODE_ENV).to.be.equal('test');
  });
});

// Test Users Endpoints
describe('User Endpoints', function () {
  describe('POST /api/users - create a new user', function () {
    it('should create a new user given valid info', function () {
      let res;
      const newUser = {
        username: 'testuser11',
        password: 'testuser11',
        email: 'testing12@test.com'
      };
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);

          return User.find({ username: 'testuser11' });
        }).then(data => {
          const user = data[0];
          expect(user.username).to.be.equal('testuser11');
          expect(user.id).to.exist;
          expect(user.email).to.be.equal('testing12@test.com');
        });
    });

    it('should return an error when missing username', function () {
      const badUser = { password: 'badtimes10', email: 'wow@thisisbad.com' };
      chai.request(app)
        .post('/api/users')
        .send(badUser)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Missing Username');
        });
    });

    it('should return an error when missing password', function () {
      const badUser = { username: 'badtimes10', email: 'wow@thisisbad.com' };
      chai.request(app)
        .post('/api/users')
        .send(badUser)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Missing Password');
        });
    });

    it('should return an error when missing email', function () {
      const badUser = { username: 'badtimes10', password: 'wow@thisisbad.com' };
      chai.request(app)
        .post('/api/users')
        .send(badUser)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Missing Email Address');
        });
    });

    it('should return an error when trailing spaces', function () {
      const badUser = { username: 'badtimes10 ', password: 'testtest123', email: 'wow@thisisbad.com' };
      chai.request(app)
        .post('/api/users')
        .send(badUser)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Username may not have leading or trailing spaces');
        });
    });

    it('should return an error when password too short', function () {
      const badUser = { username: 'testuser', password: 'test', email: 'wow@thisisbad.com' };
      chai.request(app)
        .post('/api/users')
        .send(badUser)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.equal('Password must be at least 10 characters long');
        });
    });
  });
  describe('POST /api/users/login - login with an exisitng user', function () {
    it('should return an auth token given valid credentials', function () {
      chai.request(app)
        .post('/api/users/login')
        .send({ username: 'testuser10', password: 'password10' })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.authToken).to.exist;
        });
    });

    it('should return an error when given a nonexistant user', function () {
      chai.request(app)
        .post('/api/users/login')
        .send({ username: 'notathing', password: 'sonotarealthing' })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
  });
  describe('POST /api/users/refresh - get a new token', function () {
    it('should return a new token given a valid existing one', function () {
      const user = { username: 'testuser10', password: 'password10' };

      return chai.request(app)
        .post('/api/users/refresh')
        .send(user)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
        });
    });
  });
});


// Test Question Endpoints
describe('Question Endpoints', function () {
  describe.only('GET /api/questions/userId', function () {
    it('should return a question given valid credentials', function () {
      let res;
      return chai.request(app)
        .get(`/api/questions/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
          return User.findById(userId);
        })
        .then(data => {
          const question = data.questionList.head.value;
          expect(question.silhouette).to.be.equal(res.body.silhouette);
          expect(question.filledIn).to.be.equal(res.body.filledIn);
          expect(question.answer).to.be.equal(res.body.answer);
          expect(question.m).to.be.equal(res.body.m);
          expect(question.total).to.be.equal(res.body.total);
          expect(question.correct).to.be.equal(res.body.correct);
        });
    });


  });
  describe('POST /api/questions/userID', function () {

  });
});
