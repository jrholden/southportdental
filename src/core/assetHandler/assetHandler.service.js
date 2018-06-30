'use strict';

angular.module('core.assetHandler').factory('AssetHandler', ['$http','$q',
    function ($http, $q){

        let service = {};
        let returnVal = {content: null};

        service.getSlidePaths = function () {
            $http.get('assets/assetPaths.json').then(function (data){
                console.log(data.data);
                returnVal.content = data.data.sliderImages;
            });
            return returnVal;
        };
        return service;
    }
]);