const express = require('express');
const User = require('../users/models');
const {_Node} = require('../linkedlist');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

const router = express.Router();

const insertItem = (list, item, position) => {
  let currNode = list.head;
  let counter = 0;
  while (currNode.next !== null) {
    if (counter === position - 1) {
      currNode.next = new _Node(item, currNode.next);
      return;
    } else {
      counter++;
      currNode = currNode.next;
    }
  }
  currNode.next = new _Node(item, null);
  return;
};

router.get('/:userId', jwtAuth, (req, res, next)=>{
  const {userId} = req.params;
  return User.findById(userId)
    .then(result => {
      if (result){
        res.send(result.questionList.head.value);
      }
    })
    .catch(err => res.status(404).send({error: err}));
});

router.post('/:userId', jwtAuth, (req, res, next)=>{
  const {question, userAnswer} = req.body;
  const {userId} = req.params;
  let isCorrect;
  question.answer === userAnswer.toLowerCase() ? isCorrect = true : isCorrect = false;
  
  if (isCorrect){
    question.correct++;
    question.total++;
    question.m = question.m*2;
  } else {
    question.total++;
    question.m = 1;
  }

  User.findById(userId)
    .then(result => {
      const newList = result.questionList;
      newList.head = newList.head.next;
      insertItem(newList, question, question.m);      

      return User.findByIdAndUpdate(
        userId,
        {questionList : newList},
        {new: true});
    }).catch(err => res.status(400).send({error: err}));

  res.send({result : isCorrect});
}); 


module.exports = router;