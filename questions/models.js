const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  silhouette : {
    type: String,
  },
  filledIn: {
    type: String,
  },
  answer: {
    type: String,
  },
  correct: {
    type: Number,
  },
  total : {
    type: Number,
  },
  m : {
    type: Number,
  }
});

questionSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});



module.exports = mongoose.model('Question', questionSchema);

