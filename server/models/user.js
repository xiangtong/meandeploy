var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
   first_name: {
     type: String,
     required: [true, 'Please input first name'],
     minlength:[2,'First name must be at least 2 characters']
   },
   last_name: {
     type: String,
     required: [true, 'Please input first name'],
     minlength: [2,'Last name must be at least 2 characters']
   },
   email: {
     type: String,
     required: [true, 'Please input email'],
     unique: [true,'Email address has existed!'],
     validate: {
       validator: function( value ) {
         return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test( value );
       },
       message: "{VALUE} is not a valid email address"
     }
   },
   birthday: {
     type: Date,
     required:[true,'Please input birthday']
   },
   passwordHash: {
     type: String,
     required: [true, 'Please input password'],
     validate:[
       {
         validator: function( value ) {
           return this._password == this._passwordConfirmation;
         },
         message: "Password does not match confirmation"
       },
       {
         validator: function( value ) {
           if(this._password.length<6){
             return false
           };
           return true
         },
         message: "Password is at least 6 characters long"
       },
      //  {
      //     validator: function() {
      //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$.!%*?&])[A-Za-z\d$@$.!%*?&]{6,32}/.test( this._password );
      //     },
      //     message: "Password failed validation, you must have at least 1 number, uppercase and special character"
      //   },
      ]
   },
  }, { timestamps: true
})

UserSchema.virtual('password')
    .get(function() {
     return this._password;
    })
    .set(function(value) {
        this._password = value;
      if(value){
        var salt =bcrypt.genSaltSync(12);
        this.passwordHash = bcrypt.hashSync(value, salt);
      }
});

UserSchema.virtual('passwordConfirmation')
  .get(function() {
   return this._passwordConfirmation;
  })
  .set(function(value) {
   this._passwordConfirmation = value;
  });

var User=mongoose.model('User', UserSchema);
