var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PollSchema = new mongoose.Schema({
   question: {
     type: String,
     required: [true, 'Please input question'],
     minlength: [8,'question must be at least 8 characters'],
   },
   _user:{type: Schema.Types.ObjectId,ref: 'User'},
   options1:{
    key:{
      type: String,
      required: [true, 'Please input option1'],
      minlength: [3,'option must be at least 3 characters'],
    },
    value:{type:Number,default:0}
  },
   options2:{
    key:{
      type: String,
      required: [true, 'Please input option2'],
      minlength: [3,'option must be at least 3 characters'],
    },
    value:{type:Number,default:0}
  },
   options3:{
    key:{
      type: String,
      required: [true, 'Please input option3'],
      minlength: [3,'option must be at least 3 characters'],
    },
    value:{type:Number,default:0}
  },
   options4:{
    key:{
      type: String,
      required: [true, 'Please input option4'],
      minlength: [3,'option must be at least 3 characters'],
    },
    value:{type:Number,default:0}
   }
  }, { timestamps: true
})

var Poll=mongoose.model('Poll', PollSchema);
