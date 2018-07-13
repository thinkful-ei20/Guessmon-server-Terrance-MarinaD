Guessmon - A Pokemon Guessing Game
======
**Live App** : [https://young-castle-32482.herokuapp.com](https://young-castle-32482.herokuapp.com)

**Server** : [https://guessmon-server.herokuapp.com/](https://guessmon-server.herokuapp.com/)

**Server Repository** : [https://github.com/thinkful-ei20/Guessmon-server-Terrance-MarinaD](https://github.com/thinkful-ei20/Guessmon-server-Terrance-MarinaD)


Summary
------
Welcome to Guessmon! Ever wanted to memorize pokemon but not able to keep them in your head? Guessmon is the solution! As you practice, the spaced-repittion learning algorithm will allow you to focus on those pokemon you have more trouble with- maximizing your efficiency!

In all users are able to:
* **Create** a secure account
* **Save** their progress when they logout
* **Train** forever!
* **View** pokemon silhouettes, guess names, and view results
* **View** overall accuracy for each pokemon
* **Practice** pokemon they are less familiar with, to maximize learning

Screenshots
------

### Card
![Card to be guessed](https://image.ibb.co/niJgwo/ss_sil.jpg "Unanswered Card")

## Card -Correct!
![Correct Answered](https://image.ibb.co/chDs2T/ss_correct.jpg "Correct Card")

## Card -Wrong!
![Incorrect Answered](https://image.ibb.co/imdQNT/ss_wrong.jpg "Incorrect Card")


Tech Stack
------
Guessmon was created with the following languages, libraries and frameworks:

**Database** : Mongo - Hosted with [Mlab](https://mlab.com/)

**API** : Node.js, Express.js, Mongoose, Passport.js + Json Web Token

**Client** : React.js, Redux, bootstrapped with Create-React-App, React-Form, Redux-Thunk, SVG to React CLI

**Testing** : Mocha & Chai.js, Jest & Enzyme

**Deployment** : [Heroku](https://www.herokud.com/)

Code Tour
------
### Client  
Repository: [https://github.com/thinkful-ei20/Guessmon-client-terrance-MarinaD](https://github.com/thinkful-ei20/Guessmon-client-terrance-MarinaD)

From a top level, there are three areas of note:
* `/public` - This folder holds the index.html, favicon and manifest
* `package.json` - This file enumerates all dependencies of the app and their versions
* `/src` - The source folder is where most of the hard work happens, and requires further break down.


* `/src/__tests__` : All react and redux test files are stored here. These tests include tests for actions, reducers, connected and unconnected components.
* `/src/actions` : All redux actions can be found in this folder, separated by function

     `/src/actions/about` handles opening and closing the about section
     
     `/src/actions/auth` handles logging in and refreshing tokens, as well as storing them in local storage
     
     `/src/actions/buddy` handles choosing a training buddy, open and closing buddy select
     
     `/src/actions/questions` handles fetching the next question, and posting the next answer
     
     `/src/actions/users` handles registration of new users

     `/src/actions/utils` helper functions to handle errors from the backend

* `/src/components/` : All react components and their styling are stored here, in flat style to aide imports.
* `/src/reducers/` : All redux reducers (including the combining root reducer) are in this folder. Their organization mirrors that of the actions folder.
* `/src/index.js` : Set up all Routes used by the app.
* `/src/setupTests.js` : Set up Jest testing with the correct adapter
* `/src/store.js` : Combine all reducers and make state available in the redux store

---

### Server
Repository: Here!

To run locally, clone this repository, run npm install and then npm start.

The server is written in node.js and express and can similarly be broken into 4 main categories:
* `/passport/` : Includes configuration files to set up local and Json web token authentication
* `/questions/` : All routes and models for questions, including the following:
`GET /api/questions/:userId`
`POST /api/questions/:userId`
* `/test/` : All test files for the above routes + `server.js.test` using Mocha, Chai.js and Chai-http.
* `/users/` : All routes and models to handle users, including the following: 
`POST /api/users`
`POST /api/users/login`
`POST /api/users/refresh`
* `package.json` : All dependencies and version numbers for the server
* `linkedlist.js` : Declaration of linkedList class to be used in questions routers
* `server.js` : Instantiates the express app, set up CORS and logging, mount routes and offer handlers for 404's and errors
