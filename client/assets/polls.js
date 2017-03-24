app.factory('pollFactory',['$http','$location', function($http,$location){
   var factory = {};
   factory.index = function(callback){
     $http.get('/polls').then(
       function(res){
        //  console.log(res.data)
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }

factory.show = function(pollid,callback){
     url='/polls/'+pollid
     $http.get(url).then(
       function(res){
        //  console.log(res.data)
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   factory.createpoll = function(newpoll,callback){
     $http.post('/polls',newpoll).then(
       function(res){
        //  console.log(res.data);
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   factory.updatepoll = function(updatecontent,pollid,callback){
     url='/polls/'+pollid
     $http.post(url,updatecontent).then(
       function(res){
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   factory.deletepoll = function(pollid,callback){
     url='/polls/'+pollid
     $http.delete(url).then(
       function(res){
         callback(res.data)
       },
       function(res){
         callback(res.data)
       }
     )
   }
   return factory;
}])

app.controller('PollsController',['$scope','pollFactory','$routeParams','userFactory','$location','$cookies',function ($scope,pollFactory,$routeParams,userFactory,$location,$cookies) {

  userFactory.checkstatus(function(data){
      $scope.user=data
  })

  $scope.index=function(){
    pollFactory.index(function (data){
      if(data.polls){
        $scope.successpoll=data.info
        $scope.polls=data.polls
        // console.log($scope.polls);
        }
        else if(data.info){
          $scope.successpoll=data.info
        }
      })
  };
  $scope.show=function(pollid){
    pollFactory.show(pollid,function (data){
      if(data.poll){
        $scope.successpoll=data.info
        $scope.poll=data.poll
        }
        else if(data.info){
          $scope.successpoll=data.info
        }
      })
  };
  if($routeParams){
    if($routeParams.id){
      $scope.postid=$routeParams.id
      $scope.show($scope.postid)
    }
  }
  $scope.deletepoll=function(pollid){
    pollFactory.deletepoll(pollid,function (data){
      if(data.info){
        $scope.successpoll=data.info
        $location.url('/')
        }
        else if(data.errors){
          $scope.successpoll=data.errors
        }
      })
  };
  $scope.index()
  $scope.createpoll=function(){
    if(!$scope.newpoll){
      $scope.newpoll={}
    }
    $scope.newpoll.userid=$scope.user._id
    pollFactory.createpoll($scope.newpoll,function (data){
      if(data.poll){
        $scope.newpoll={}
        $scope.successpoll=data.info
        $scope.poll=data.poll
        $location.url('/polls')
        }
        else if(data.info){
          $scope.message=data.info
        }
    })
  };
  $scope.updatepoll=function(key){
    value=$scope.poll[key].value+1
    updatecontent={}
    key=key+'.value'
    updatecontent[key]=value
    pollFactory.updatepoll(updatecontent,$scope.poll._id,function (data){
      if(data.poll){
        $scope.successpoll=data.info
        $scope.poll=data.poll
        }
        else if(data.info){
          $scope.message=data.info
        }
    })
  };
}])
