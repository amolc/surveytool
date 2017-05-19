    'use strict';
    // var app = angular.module('surveyTool', ['angular-storage','angularPayments']);
    app.config(['storeProvider', function(storeProvider) {
      storeProvider.setStore('sessionStorage');

    }]);

    app.controller('surveyCtrl', function($scope, $http, $window, $sce, $timeout,$location, store) {


//-----------------------------------------------------------------
      //**answer function **
      $scope.answer = function() {

        angular.forEach($scope.itemoption, function(value, key) {
          //var ans = $filter("json")(value);
          //var ans = JSON.stringify(value);

          $scope.data = {}
          $scope.data.item_ID = key;
          $scope.data.userID = $scope.userdata.registration_id;

          $scope.data.user_answer = "";

          value.forEach(function(x){
            if(value.length > 1 ){
                  if((''+$scope.data.user_answer).length == ""){
                    $scope.data.user_answer = Object.values(x);
                  }else{
                    $scope.data.user_answer = $scope.data.user_answer + ", " + Object.values(x);
                  }
            }else{
              $scope.data.user_answer = $scope.data.user_answer + Object.values(x);
            }

          });

          $http.post(baseurl + 'answer', $scope.data).success(function(res) {
            $scope.response = res;

            if (res.status == 'false') {
              alert(res.message);
            } else {
              //alert(res.message);
            }
          }).error(function() {
              alert("Please check your internet connection or data source..");
          });

        });
        $("#surveyitem").fadeOut(500);
        $("#thankyou").fadeIn(200);
        setTimeout(function () {
              $("#thankyou").fadeOut(5000);
              $("#surveycategory").fadeIn(2000);
        }, 7000);


      }


//-----------------------------------------------------------------
      //**pinkids function **
      $scope.pinkid = function(itemId, res) {

        var tags = $http
          .get(baseurl + 'item/itemid/' + itemId)
          .success(function(res) {
            if (res.status == 'false') {
              alert(res.message);
            } else {
              console.log(res);
              // deferred = res ;
            }
          }).error(function() {
            console.log("Pinkid not found");
          })
        return tags;


      }

//-----------------------------------------------------------------
      //**back function **
      $scope.back = function() {
        $("#surveycategory").show();
        $("#surveyitem").hide();
      }

//-----------------------------------------------------------------
      //**survey function **
      $scope.survey = function(categoryId, res) {
        $("#surveycategory").hide();
        $("#surveyitem").show("slow");

        $http.get(baseurl + 'item/' + categoryId).success(function(res) {
          $scope.response = res;
          if (res.status == 'false') {
            alert(res.message);
          } else {
            console.log(res);
            $scope.items = res;

            console.log($scope.items);

            $scope.items.forEach(function (x){
              var currentItemID = x.item_ID;
              console.log(currentItemID);

              $scope.toPush = [];
              $scope.submittedAnswer.forEach(function (y){
                var submittedID = y.item_ID;
                console.log(submittedID);
                console.log(y.user_answer);

                if(currentItemID == submittedID){
                  $scope.toPush.push(y.user_answer);
                  console.log($scope.itemoption[currentItemID]);
                }
              })
              $scope.itemoption[currentItemID] = $scope.toPush;
              
              // $http.get(baseurl + 'item/findQty/' + categoryId).success(function(res) {
              //   if (res.status == 'false') {
              //     alert(res.message);
              //   } else {
              //     console.log(res);
              //     $scope.itemSize = res;
              //   }
              //   }).error(function() {
              //     console.log("Pinkid not found");
              //   })  

            })

          }
        }).error(function() {
          alert("Please check your internet connection or data source..");
        });
        
      }



//-----------------------------------------------------------------
      //**findUserAnswer function**
      $scope.findUserAnswer = function(userid,res){
        console.log(userid);

          $http.get(baseurl + 'answer/getAnswer/' + userid).success(function(res) {
            //$scope.response = res;
            if (res.status == 'false') {
              alert(res.message);
            } else {
              console.log(res);
              $scope.submittedAnswer = res;
              $scope.submittedItemID = "";

              $scope.submittedAnswer.forEach(function(x){
                $scope.submittedItemID += " " + x.item_ID;
              })
              console.log($scope.submittedItemID);
              
            }
          }).error(function() {
            alert("Please check your internet connection or data source..");
          });
      }

//-----------------------------------------------------------------
      //**user function**
      $scope.user = function(userPassword, res) {
        console.log('user function called');
        console.log('userPassword',userPassword);
        $scope.data ={}
        $scope.data.userPassword = userPassword ;
        $http.post(baseurl + 'user/getUser', $scope.data).success(function(res) {

            console.log('res',res);
            if (res.status == 'false') {
              console.log(res.message);
            } else {
              $scope.userdata = res;
              $scope.userid = $scope.userdata.registration_id;
              console.log('scope.userdata',$scope.userdata);
              console.log('Firstname',$scope.userdata.firstname);
              console.log('Lastname',$scope.userdata.lastname);
              $scope.findUserAnswer($scope.userid);
            }
          }).error(function() {
            alert("Please check your internet connection or data source..");
          });

      }

//-----------------------------------------------------------------   
      //**init function**
      $scope.init = function() {
        $scope.itemoption = {};

        $("#surveycategory").show("slow");
        $("#surveyitem").hide();
        $("#thankyou").hide();

        //console.log('test', $scope.itemoption);

          $http.get(baseurl + 'allcategory').success(function(res) {
            if (res.status == 'false') {
              alert(res.message);
            } else {
              $scope.category = res;
            }
          })
          .error(function() {
            alert("Please check your internet connection or data source..");
          });

          console.log('location',$location);
          console.log('location.path',$location.absUrl().search('userid'));

            var url = window.location.href;
            var parts = url.split("/");
            var dirtyuserid= parts[4];
            var useridarray = dirtyuserid.split("=");
            var userid = useridarray[1];
            console.log('firstTermValue',userid);
            $scope.user(userid);
            console.log('userdetails',$scope.userdata);

      }

      var baseurl = "http://localhost:3000/api/";
    });
