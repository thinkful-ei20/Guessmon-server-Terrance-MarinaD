const express = require('express');
const User = require('../users/models');

const router = express.Router();

router.get('/:userId', (req, res, next)=>{
  const {userId} = req.params;
  let question;
  return User.findById(userId)
    .then(result => {
      if (result){
        question = result.questionList.head.value;
      }
      const newList = result.questionList;
      newList.head = newList.head.next;
      res.send(question);
    })
    .catch(err => res.status(404).send(err));
});
// call removeFirst method
/*
router.post() -> an answer to the question
   validate the answer

  //do all the work to insert and remove the last items
  const newLinkedList = 

   User.findOneandUpdate({id: jfkdla})
    .send({questionList: newLinkedList})

*/

module.exports = router;