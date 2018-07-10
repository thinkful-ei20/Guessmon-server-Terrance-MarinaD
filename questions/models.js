const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  
});

questionSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});



module.exports = mongoose.model('Question', questionSchema);

