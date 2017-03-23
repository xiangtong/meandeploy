var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt')
var session = require('express-session')

module.exports={
  // registers Request
  register:function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      birthday: req.body.birthday});
    // console.log(user);
    user.save(function(err,userobj) {
      context={}
      info={}
      if(err) {
        if(user.errors){
          if ('first_name' in user.errors){
            info.first_name=user.errors.first_name.message
          }
          if ('last_name' in user.errors){
            info.last_name=user.errors.last_name.message
          }
          if ('email' in user.errors){
            info.email=user.errors.email.message
          }
          if ('passwordHash' in user.errors){
            info.password=user.errors.passwordHash.message
          }
          if ('birthday' in user.errors){
            info.birthday=user.errors.birthday.message
          }
          context.info=info
        }
        else{
          if(err.message.indexOf('duplicate key error')>-1){
            info.email='the email address has existed!'
            context.info=info
          }
        }
      } else {
        req.session.user=userobj
        req.session.save()
        info='successfully registration!'
        context.info=info
        context.user=userobj
        console.log(userobj);
      }
      res.json(context)
    })
  },
  // Login Request
  login:function(req, res) {
    console.log("POST DATA", req.body);
    var email= req.body.email
    var password=req.body.password
    User.findOne({email:email}).exec(function(err,user) {
      context={}
      info={}
      if(err) {
        // console.log(err);
        context.info=User.errors
      } else {
        // console.log(user);
        if(!user){
          info.lemail='email address does not exist!'
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
      console.log(context);
      res.json(context)
    })
  },
  checkstatus:function(req,res){
    if(req.session.user){
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
