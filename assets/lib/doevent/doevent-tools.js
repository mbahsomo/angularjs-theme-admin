var doeventTools = angular.module('dTools', []);
doeventTools.factory('doeventTools', function($rootScope, $http, $filter) {
    var doeventToolsService = {};
    doeventToolsService.getObject = function(obj, id, skey) {
        var hasil = {};
        angular.forEach(obj, function(value, key) {
            if (id === value[skey]) {
                hasil = value;
                return false;
            }
        });
        console.log(hasil);
        return hasil;
    };
    doeventToolsService.setObject= function(objAsal,objTujuan){
        
    };
    return doeventToolsService;
});