'use strict';

angular.module('core.assetHandler').factory('AssetHandler', ['$http','$q',
    function ($http, $q){

        let service = {};
        let returnVal = {content: null};

        service.getSlidePaths = function () {
            $http.get('assets/assetPaths.json').then(function (file){

                returnVal.content = file.data.slidePaths;
            });
            return returnVal;
        };
        service.getSlideStrings = function () {
            $http.get('assets/assetPaths.json').then(function (file){
                returnVal.content = file.data.slideStrings;
            });
            return returnVal;
        };
        service.getTeamDetails = function () {
            $http.get('assets/teamDetails.json').then(function (file){
                returnVal.content = file.data.teamDetails;
            });
            return returnVal;
        };
        return service;
    }
]);