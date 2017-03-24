app.factory('userFactory',['$http','$location', function($http,$location){
   var factory = {}
   factory.checkstatus = function(callback){
     $http.get('/checkstatus').then(
       function(res){
         if(!res.data){
           $location.url('/')
         } else {
          //  console.log(res.data);
           callback(res.data)
         }
       }
     )
   }
   factory.register = function(newuser,callback){
     $http.post('/register',newuser).then(
       function(res){
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
        //  console.log(res);
         callback(res.data)
       },
       function(res){
        //  console.log(res);
         callback(res.data)
       }
     )
   }
   return factory;
}])

app.controller('UsersController',['$scope','userFactory','$location','$cookies',function ($scope,userFactory,$location,$cookies) {
  // console.log("enter controller");
  if($cookies.get('successmessage')){
      $scope.successmessage=$cookies.get('successmessage')
      $cookies.remove('successmessage')
  }
  userFactory.checkstatus(function(data){
      $scope.user=data
      // console.log($location.path());
      // console.log($scope.user);
      if($scope.user&&$location.path()=='/'){
        $location.url('/polls')
      }
  })

  $scope.register=function(){
    userFactory.register($scope.newuser,function (data){
      if(data.user){
        $scope.newuser={}
        $scope.user=data.user
        $cookies.put('successmessage', data.info)
        $location.url('/polls')
        }
        else {
          $scope.message=data.info
        }
      })
  };
  $scope.login=function(){
    userFactory.login($scope.loginuser,function (data){
      if(data.user){
        $scope.loginuser={}
        $scope.user=data.user
        $cookies.put('successmessage', data.info)
        $location.url('/polls')
        }
        else {
          $scope.message=data.info
        }
    })
  };
  $scope.logout=function(){
    userFactory.logout(function (data){
      if(data.info){
        $scope.user = {}
        $cookies.put('successmessage', data.info)
        url='/'
        $location.url(url)
        }
        else {
          $scope.message=data.errors
          // console.log($scope.message)
        }
      })
  };
}])
