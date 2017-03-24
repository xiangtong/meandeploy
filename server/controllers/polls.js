var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');

module.exports={
  index:function(req, res) {
    var context={}
    Poll.find()
    .populate('_user','username')
    .exec( function(err, polls) {
      if(err) {
        context.error="backend error!"
      } else {
        context.polls=polls
      }
      res.json(context)
    })
  },
  //display info of one polls
  show:function(req, res) {
    var id=req.params.id
    var context={}
    Poll.findById(id, function(err, poll) {
      if(err) {
        context.error="backend error!"
      } else {
        context.poll=poll
      }
      res.json(context);
    })
  },
  // Add Poll Request
  createpoll:function(req, res) {
    console.log("POST DATA", req.body);
    User.findOne({_id: req.body.userid}, function(err, user){
      // console.log(user);
      var poll = new Poll({
        question: req.body.question,
        options1:{key:req.body.option1},
        options2:{key:req.body.option2},
        options3:{key:req.body.option3},
        options4:{key:req.body.option4}
      });
      poll._user=user._id
      user.polls.push(poll)
      user.save(function(err){
        poll.save(function(err) {
          context={}
          info={}
          if(err) {
            if ('question' in poll.errors){
              info.question=poll.errors.question.message
            }
            if ('options1.key' in poll.errors){
              info.option1=poll.errors['options1.key'].message
            }
            if ('options2.key' in poll.errors){
              info.option2=poll.errors['options2.key'].message
            }
            if ('options3.key' in poll.errors){
              info.option3=poll.errors['options3.key'].message
            }
            if ('options4.key' in poll.errors){
              info.option4=poll.errors['options4.key'].message
            }
            context.info=info
            // context.errors=poll.errors
          } else {
            info='successfully add a poll!'
            context.info=info
            context.poll=poll
          }
          res.json(context)
        })
     })
    })
  },
  //update poll request
  updatepoll:function(req, res) {
    var id=req.params.id
    var updatecontent={$set:req.body};
    // console.log(updatecontent);
    Poll.findByIdAndUpdate(id,updatecontent,function(err) {
      context={}
      if(err) {
        context.errors=Poll.errors
        res.json(context)
      } else {
        Poll.findById(id, function(err, poll) {
          if(err) {
            context.error="backend error!"
          } else {
            context.poll=poll
          }
          res.json(context);
        })
      }
    })
  },
  //delete an poll
  deletepoll:function(req, res) {
    var id=req.params.id
    Poll.findByIdAndRemove(id,function(err) {
      context={}
      if(err) {
        context.errors='backend error'
        res.json(context)
      } else { // else console.log that we did well and then redirect to the root route
        context.info='successfully delete a poll!'
        Poll.findById(id, function(err, poll) {
          if(err) {
            context.error="backend error!"
          } else {
            context.poll=poll
          }
          res.json(context);
        })
      }
    })
  }
}
