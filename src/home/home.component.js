'use strict';

angular.module('home').component('home', {
    templateUrl: 'home/home.template.html',
    controller: ['$scope', '$rootScope',
        function HomeController($scope, $rootScope) {

            $scope.slides = false;
            console.log($scope.slides);
            $rootScope.$watch('slides', function (){
                $scope.slides = ($rootScope.slides.content);
                console.log($rootScope.slides);
            });
        }
    ]
});