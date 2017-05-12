    'use strict';
    // var app = angular.module('surveyTool', ['angular-storage','angularPayments']);
    app.config(['storeProvider', function(storeProvider) {
        storeProvider.setStore('sessionStorage');

    }]);
    
    app.controller('surveyCtrl', function($scope, $http,$window ,$sce, $timeout, $location, store) {
            // var uid = $location.search().myParam;
            // console.log(uid);

           $scope.$location = $location;
           $scope.ur = $scope.$location.url($location.absUrl());
           $scope.loc1 = $scope.$location.search().uid ;    
           
           if($location.url().indexOf('uid') > -1){    
                $scope.loc= $location.url().split('=')[1];
                $scope.loc = $scope.loc.split("#")[0]      
                //console.log($scope.loc);  
                $scope.userID = $scope.loc;
                console.log($scope.userID);
            }

            $scope.answer = function(){

            angular.forEach($scope.itemoption, function(value, key){
                //console.log(key + ":" + value);
                $scope.data = {}
                $scope.data.item_ID = key;
                $scope.data.userID = $scope.userID;
                $scope.data.user_answer = value;

                $http.post(baseurl + 'answer',$scope.data).success(function(res) {
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
            alert("You have successfully submitted your responses, goodbye!");
            
          }

          $scope.survey = function(categoryId,res) { 
            $("#circus").hide();
            $("#questions").show("slow");
            
            $http.get(baseurl + 'item/' + categoryId).success(function(res){
            $scope.response = res;
            if (res.status == 'false') {
                alert(res.message);
            } else {
                //console.log(res);
                $scope.items=res;
            }

			}).error(function() {
				alert("Please check your internet connection or data source..");
			});
            }
            

          $scope.init = function() {
              $scope.itemoption = {};

            $("#circus").show("slow");
            $("#questions").hide();

            //console.log('test', $scope.itemoption);
            
            $http.get(baseurl + 'allcategory').success(function(res) {
            $scope.response = res;
            console.log(res);
            if (res.status == 'false') {
                alert(res.message);
            } else {
                //console.log(res);
                $scope.category=res;
            }

			}).error(function() {
				alert("Please check your internet connection or data source..");
			});

          }
          
          var baseurl = "http://localhost:3000/api/" ;
    });
