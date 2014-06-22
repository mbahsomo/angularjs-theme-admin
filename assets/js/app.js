$script(
    [
        'assets/lib/ng-grid/ng-grid.min.js',
        'assets/lib/angularjs/angular-route.min.js',        
        'assets/lib/angularjs/angular-animate.min.js',
        'assets/lib/ng-tree/abn_tree_directive.js'
    ], 
    'app'
);

$script.ready('app',function(){
    
    var app = angular.module('ThemeApp', ['ngRoute','angularBootstrapNavTree','ngGrid']);
    
    app.filter('dateEntry',function myDateFormat($filter){
        return function(text){
            if(text !== null){
                var  tempdate= new Date(text.replace(/-/g,"/"));
                return $filter('date')(tempdate, "dd-MM-yyyy HH:mm:ss");    
            }else{
                return $filter('date')(new Date(), "dd-MM-yyyy HH:mm:ss");    
            }
            
        };
    });
    app.provider('jsDeps',function() {
        this.$get = function(dependencies) {return { jsdeps: function($q,$rootScope) {
            var deferred = $q.defer();
            $script(dependencies, function(){
                $rootScope.$apply(function(){
                    deferred.resolve();
                });               
            }); 
            return deferred.promise;
       }}}
    });

  
    app.config(function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, jsDepsProvider, $httpProvider)
    {
        app.controllerProvider = $controllerProvider;
        app.compileProvider    = $compileProvider;
        app.routeProvider      = $routeProvider;
        app.filterProvider     = $filterProvider;
        app.provide            = $provide;
        $routeProvider.when('/', {
            templateUrl: 'assets/app/awal.html', 
            title: 'Awal',
            controller: 'AwalController',
            resolve: jsDepsProvider.$get(['assets/app/awal.js'])
        }).when('/grid', {
            templateUrl: 'assets/app/awal.html', 
            title: 'Awal',
            controller: 'AwalController',
            resolve: jsDepsProvider.$get(['assets/app/awal.js'])
        }).when('/form', {
            templateUrl: 'assets/app/form.html', 
            title: 'Form',
            controller: 'FormController',
            resolve: jsDepsProvider.$get(['assets/app/form.js'])
        });        
    });


    app.controller('cobaCtrl', function($scope, $timeout, $location){
        var apple_selected, tree, treedata_avm, treedata_geography;
        $scope.my_tree_handler = function(branch) {
          var _ref;
          console.log(branch);
          if(branch.url!==undefined){
            $location.path(branch.url);
          }
          $scope.output = "You selected: " + branch.label;
          if ((_ref = branch.data) != null ? _ref.description : void 0) {
            return $scope.output += '(' + branch.data.description + ')';
          }
        };
        apple_selected = function(branch) {
          return $scope.output = "APPLE! : " + branch.label;
          console.log(branch);
        };
        treedata_avm = [
          {
            label: 'Master',
            children: [
              {
                label: 'Grid',
                url : 'grid',
                data: {
                  description: "Grid menu"
                }
              }
            ]
          }, {
            label: 'Entry',
            data: {
              definition: "Entry Data"
            },
            children: [
              {
                label: 'Transaksi',
                url : 'form'
              }
            ]
          }, {
            label: 'Report',
            children: [
              {
                label: 'Laporan',
                url : 'laporan'
              }
            ]
          }
        ];
        
        $scope.my_data = treedata_avm;
        $scope.my_tree = tree = {};
    });

    angular.bootstrap(document.body, ['ThemeApp']);    
    
});