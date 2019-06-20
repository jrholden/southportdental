'use strict';

angular.module('team').component('team', {
    templateUrl: 'team/team.template.html',
    controller: [ '$scope', '$rootScope',
        function HomeController($scope, $rootScope) {
            $scope.teamDetails = false;
            $scope.loadingDone = false;
            //$scope.sectionClass = "mx-auto";

            $rootScope.$watch('teamDetails', function(){
                $scope.teamDetails = ($rootScope.teamDetails.content);
                console.log($scope.teamDetails);
                $scope.loadingDone = true;
            });

            $scope.getSectionClass = function(index){
              if(index % 2 === 0){
                  return "mx-auto";
              }else {
                  return "mr-auto";
              }
            };

            console.log($scope.teamDetails);
        }
    ]
});