angular.module('ThemeApp').controllerProvider.register('AwalController', function($scope, $http, $document){
	$scope.dataRec = [];
	$scope.dataRecSelect = [];

	$scope.KlikEvnt = function(row){
		console.log(row);
		row.age=212;
	};

	$scope.EditRec = function(){
		console.log($scope.dataRecSelect);
		$scope.dataRecSelect[0].age=212;
	};

    $scope.onGridDoubleClick = function(row){
        console.log(row);
    };

    $scope.gridOptions = {
    	data: 'dataRec' ,
    	columnDefs: [
    		{field:'name', displayName:'Name', resizable : true}, 
    		{field:'age', displayName:'Age', width: '100px', resizable : true},
    		{
    			displayName:'Event',
    			cellTemplate : '<button class="btn btn-default btn-xs" ng-click="KlikEvnt(row.entity)"><i class="glyphicon glyphicon-pencil"></i> Edit</button>',
    			width: '100px'
    		}
    	],
    	enablePaging: true,
		showFooter: true,
		multiSelect: false,
      	enablePinning: true,
      	showGroupPanel: true,
      	//jqueryUITheme: true,
      	showColumnMenu: true,
        showSelectionCheckbox: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: $scope.dataRecSelect
        /*rowTemplate :'<div ng-dblclick="onGridDoubleClick(row)" ng-style="{\'cursor\': row.cursor}" ng-repeat="col in visibleColumns()" class="ngCell col{{$index}} {{col.cellClass}}" ng-cell></div>',        */
    };

    $scope.LoadGrid = function () {
    	for (a = 0 ; a <100; a++){
    		$scope.dataRec[a] = {name:'Data ke ' + a, age : a};	
    	}
    };

    $scope.LoadGrid();

    $scope.ShowAdd = function (){
    	angular.element('#window-modal').modal(
    		{
                top : '150px',
    			backdrop:false,
    			keyboard:false
    		}
    	);
    };
});