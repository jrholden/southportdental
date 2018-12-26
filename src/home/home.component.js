'use strict';

angular.module('home').component('home', {
    templateUrl: 'home/home.template.html',
    controller: ['$scope', '$rootScope',
        function HomeController($scope, $rootScope) {

            $scope.slidePaths = false;
            $scope.slideStrings = false;

            $scope.index = 0;

            $rootScope.$watch('slidePaths', function () {
                $scope.slidePaths = ($rootScope.slidePaths.content);
            });
            $rootScope.$watch('slideStrings', function () {
                $scope.slideStrings = ($rootScope.slideStrings.content);
            });

            $scope.setSliderIndex = function (i){
                console.log("Setting index to: "+ i);
                console.log($scope.slidePaths);
                console.log($scope.slideStrings);
                $scope.index = i;
            }

        }
    ]
});