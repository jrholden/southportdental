'use strict';

angular.module('southportDental')

    .run(function ($rootScope, AssetHandler) {
        $rootScope.slidePaths = (AssetHandler.getSlidePaths());
        $rootScope.slideStrings = (AssetHandler.getSlideStrings());
    })

    .config(['$locationProvider', '$routeProvider',

        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');


            $routeProvider.when('/home', {
                template: '<home></home>'
            }).when('/contact', {
                template: '<contact></contact>'
            
            }).when('/team', {
                template: '<team></team>'
            }).when('',{
                templateUrl: '/home'
            }).otherwise('/home');
        }
    ]).controller('HeaderController', [ '$scope', '$location',
    function HeaderController($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);