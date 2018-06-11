'use strict';

angular.module('southportDental')


    .config(['$locationProvider', '$routeProvider',

        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.when('/home', {
                template: '<home></home>'
            }).otherwise('/home');
        }
    ]);