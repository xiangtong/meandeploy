var app = angular.module('myApp', ['ngRoute','ngCookies']);
app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
$routeProvider
  .when('/',{
      templateUrl: '../partials/regandlogin.html',
  })
  .when('/profile/:userid',{
      templateUrl: '../partials/profile.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.factory('userFactory',['$http','$location', function($http,$location){
   var factory = {};
   var userobj=null
   factory.getuser=function(){
     return userobj;
   }
   factory.setuser=function(){
     userobj=null
   }
   factory.checkstatus=function(callback){
     $http.get('/checkstatus').then(
       function(res){
         if(!res.data){
           userobj=null
           $location.url('/')
         } else {
           userobj=res.data
         }
       }
     )
   }
   factory.register = function(newuser,callback){
     $http.post('/register',newuser).then(
       function(res){
         userobj=res.data.user
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   factory.login = function(user,callback){
     $http.post('/login',user).then(
       function(res){
         userobj=res.data.user
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   factory.logout = function(callback){
     $http.get('/logout').then(
       function(res){
         console.log(res);
         callback(res.data)
       },
       function(res){
         console.log(res);
         callback(res.data)
       }
     )
   }
  //  factory.checkInput=function(newuser){
  //   //  console.log(newuser);
  //     if(typeof(newuser)==='undefined'){
  //       return true;
  //     }
  //     else if (!newuser.firstname ||!newuser.lastname || !newuser.birthday ){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //  }
   return factory;
}])

app.controller('UsersController',['$scope','userFactory','$location','$routeParams','$cookies',function ($scope,userFactory,$location,$routeParams,$cookies) {
  console.log("enter controller");
  if($cookies.get('successmessage')){
      $scope.successmessage=$cookies.get('successmessage')
      $cookies.remove('successmessage')
  }
  userFactory.checkstatus()
  if($routeParams){
    if($routeParams.userid){
      temp=userFactory.getuser()
      if(temp){
        if(temp._id==$routeParams.userid){
          $scope.user=temp
        }
      }
    }
  }
  console.log($location.path());
  console.log(userFactory.getuser());
  if(userFactory.getuser()&&$location.path()=='/'){
    $location.url('/profile/'+userFactory.getuser()._id)
  }
  $scope.register=function(){
    userFactory.register($scope.newuser,function (data){
      if(data.user){
        $scope.newuser={}
        $cookies.put('successmessage', data.info)
        url='/profile/'+data.user._id
        $location.url(url)
        }
        else {
          // console.log(data.info);
          $scope.message=data.info
        }
      })
  };
  $scope.login=function(){
    userFactory.login($scope.loginuser,function (data){
      if(data.user){
        $scope.loginuser={}
        $cookies.put('successmessage', data.info)
        url='/profile/'+data.user._id
        $location.url(url)
        }
        else {
          // console.log(data.info);
          $scope.message=data.info
          // console.log($scope.message)
        }
    })
  };
  $scope.logout=function(){
    userFactory.logout(function (data){
      if(data.info){
        $scope.user = {}
        userFactory.setuser()
        $cookies.put('successmessage', data.info)
        url='/'
        $location.url(url)
        }
        else {
          $scope.message=data.errors
          console.log($scope.message)
        }
      })
  };
}])
