var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt')
var session = require('express-session')

module.exports={
  // registers Request
  register:function(req, res) {
    // console.log("POST DATA", req.body);
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation});
    // console.log(user);
    user.save(function(err,userobj) {
      context={}
      info={}
      if(err) {
        if(user.errors){
          if ('username' in user.errors){
            info.username=user.errors.username.message
          }
          if ('passwordHash' in user.errors){
            info.password=user.errors.passwordHash.message
          }
          context.info=info
        }
        else{
          if(err.message.indexOf('duplicate key error')>-1){
            info.username='the username has existed!'
            context.info=info
          }
        }
      } else {
        req.session.user=userobj
        req.session.save()
        info='successfully registration!'
        // console.log('success');
        context.info=info
        context.user=userobj
        // console.log(userobj);
      }
      res.json(context)
    })
  },
  // Login Request
  login:function(req, res) {
    // console.log("POST DATA", req.body);
    var username= req.body.username
    var password=req.body.password
    if(!username && !password){
      res.json({info:{lusername:'please input username',lpassword:'please input password'}})
    } else if(!username){
      res.json({info:{lusername:'please input username'}})
    } else if(!password){
      res.json({info:{lpassword:'please input password'}})
    } else {
      User.findOne({username:username}).exec(function(err,user) {
        context={}
        info={}
        if(err) {
          // console.log(err);
          context.info=User.errors
        } else {
          // console.log(user);
          if(!user){
            info.lusername='username does not exist!'
            context.info=info
          } else if(bcrypt.compareSync(password, user.passwordHash)){
            info='successfully login!'
            req.session.user=user
            req.session.save()
            context.info=info
            context.user=user
          } else {
            info.lpassword='invalid password'
            context.info=info
          }
        }
        // console.log(context);
        res.json(context)
      })
    }

  },
  checkstatus:function(req,res){
    if(req.session.user){
      // console.log
      // console.log(req.session.user);
      res.json(req.session.user)
    } else {
      res.json(null)
    }
  },
  //logout request
  logout:function(req, res) {
    req.session.destroy()
    res.json({info:'successfully logout'})
    // res.redirect('/')
  },

}
