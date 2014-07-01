angular.module('ThemeApp').controllerProvider.register('AwalController', function($scope, $http, $document, toaster){
	$scope.dataRec = [];
	$scope.dataRecSelect = [];
    
    $scope.LoadGrid = function () {
        for (a = 0 ; a <100; a++){
            $scope.dataRec[a] = {name:'Data ke ' + a, age : a}; 
        }
    };

    $scope.LoadGrid();

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
        //headerRowHeight : 60,
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

    $scope.ShowAdd = function (){
    	angular.element('#window-modal').modal(
    		{
                top : '150px',
    			backdrop:false,
    			keyboard:false
    		}
    	);
    };

    $scope.ShowEdit = function(){
        angular.element('#window-modal').modal(
            {
                top : '150px',
                backdrop:false,
                keyboard:false
            }
        );  
    }

    $scope.ShowDelete = function(){
        if (confirm('Anda yakin menghapus data ini? ')) {
            angular.forEach($scope.dataRecSelect, function(rowItem) { 
                $scope.dataRec.splice($scope.dataRec.indexOf(rowItem),1);
            });
        }
    };

    $scope.ShowFilter = function(){
        angular.element('#window-filter').modal(
            {
                top : '150px',
                backdrop:false,
                keyboard:false
            }
        );
    };

    $scope.Reload = function(){
        $scope.LoadGrid();
        $scope.gridOptions.ngGrid.buildColumns();
    }

    $scope.Save = function(){
        toaster.pop('success', "title", "text");
        //angular.element('#window-modal').modal('hide');
    }

    $scope.Print = function(){
        print_preview('http://lokal.com/latihan/theme-angular/assets/app/awal.js', '');
    }
});