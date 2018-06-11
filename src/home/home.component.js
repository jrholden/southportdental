'use strict';

angular.module('home').component('home', {
    templateUrl: 'home/home.template.html',
    controller: ['$scope',
        function HomeController ($scope){
            $scope.test = "test BB";
        }
    ]
});