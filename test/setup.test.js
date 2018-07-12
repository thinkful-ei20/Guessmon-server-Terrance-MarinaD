require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');

const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');
const User = require('../users/models');
const defaultList = require('../startList');
const { app } = require('../index');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

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
  }).then(data => console.log('created user: ', data.username));
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
          console.log('the result of logging in is, ' + JSON.stringify(res.body));
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
      chai.request(app)
        .post('/api/users/login')
        .send(user)
        .then(res => {
          const token = res.body.authToken;
          console.log(token);
          return chai.request(app)
            .post('/api/users/refresh')
            .send(user)
            .set('Authorization', `Bearer ${token}`);
        }).then(res => {
          expect(res).to.have.status(200);
        });
    });
  });
});
