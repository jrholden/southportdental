'use strict';

angular.module('core.assetHandler').factory('AssetHandler', ['$http','$q',
    function ($http, $q){

        let service = {};
        let returnVal = {content: null};

        service.getSlidePaths = function () {
            $http.get('assets/assetPaths.json').success(function (data){
                returnVal.content = data.sliderImages;
            });
            return returnVal;
        };
        return service;
    }
]);