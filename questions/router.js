const express = require('express');
const User = require('./models');

const router = express.Router();

router.get('/:userId', (req, res, next)=>{
  const {userId} = req.params;

  return User.findById({_id : userId})
    .then(result => {
      if (result){
        console.log(result);
      }
    });
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