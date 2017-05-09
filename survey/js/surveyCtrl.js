    'use strict';
    // var app = angular.module('surveyTool', ['angular-storage','angularPayments']);
    app.config(['storeProvider', function(storeProvider) {
        storeProvider.setStore('sessionStorage');

    }]);
    
    app.controller('surveyCtrl', function($scope, $http,$window ,$sce, $timeout, store) {

          $scope.survey = function(categoryId,res) { 
            $("#circus").hide();
            $("#questions").show("slow");
            
            console.log(categoryId);
            console.log(res);

            $scope.items = {};
            $scope.items.categoryId = categoryId;
            $http.post(baseurl + 'allitembycategory', $scope.items).success(function(res){
            
            $scope.response = res;
            console.log(res);
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

            $("#circus").show("slow");
            $("#questions").hide();
            
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
