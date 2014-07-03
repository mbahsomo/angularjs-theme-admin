angular.module('ThemeApp').controllerProvider.register('AwalController', function($scope, $http, $document, toaster, $filter) {
    $scope.dataRec = [];
    $scope.dataRecOld = [];
    $scope.dataRecSelect = [];
    $scope.dataRecSelectOld = [];
    $scope.fields = {};
    $scope.add = true;

    $scope.LoadGrid = function() {
        for (a = 0; a < 100; a++) {
            $scope.dataRec[a] = {name: 'Data ke ' + a, age: a};
        }
        $scope.dataRecOld = $scope.dataRec;

    };

    $scope.LoadGrid();

    $scope.GetKey = function() {
        angular.forEach($scope.dataRec[0], function(value, key) {
            $scope.fields[key] = '';
        });
    };

    $scope.GetKey();

    $scope.FilterData = function() {
        $scope.dataRec = $filter('filter')($scope.dataRec, $scope.fields);
        angular.element('#window-filter').modal('hide');
    };
    
    $scope.ResetFilter = function() {
        $scope.dataRec = $scope.dataRecOld;
    };

    $scope.gridOptions = {
        data: 'dataRec',
        columnDefs: [
            {field: 'name', displayName: 'Name', resizable: true},
            {field: 'age', displayName: 'Age', width: '100px', resizable: true}
            /*,{
                displayName: 'Event',
                cellTemplate: '<button class="btn btn-default btn-xs" ng-click="KlikEvnt(row.entity)"><i class="glyphicon glyphicon-pencil"></i> Edit</button>',
                width: '100px'
            }*/
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

    

    /*$scope.KlikEvnt = function(row) {
        console.log(row);
        row.age = 212;
    };*/

    $scope.EditRec = function() {
        console.log($scope.dataRecSelect);
        $scope.dataRecSelect[0].age = 212;
    };

    $scope.onGridDoubleClick = function(row) {
        console.log(row);
    };

    $scope.ShowAdd = function() {
        /*var grid = $scope.gridOptions.ngGrid;
        grid.$viewport.scrollTop(grid.rowMap[ $scope.dataRec.length-1] * grid.config.rowHeight);*/

        var rowLen;
        var e = $scope.$on('ngGridEventData', function() {
            $scope.gridOptions.selectItem(rowLen-1, true);
            e();
        });
        
        rowLen = $scope.dataRec.push({});

        angular.element('#window-modal').modal(
            {
                top: '150px',
                backdrop: false,
                keyboard: false
            }
        );
    };

    $scope.ShowEdit = function() {
        $scope.add = false;
        angular.copy($scope.dataRecSelect, $scope.dataRecSelectOld);
        angular.element('#window-modal').modal(
            {
                top: '150px',
                backdrop: false,
                keyboard: false
            }
        );
    };

    $scope.ShowDelete = function() {
        if (confirm('Anda yakin menghapus data ini? ')) {
            angular.forEach($scope.dataRecSelect, function(rowItem) {
                $scope.dataRec.splice($scope.dataRec.indexOf(rowItem), 1);
            });
        }
    };

    $scope.CancelSave = function(){
        if ($scope.add){
            angular.forEach($scope.dataRecSelect, function(rowItem) {
                $scope.dataRec.splice($scope.dataRec.indexOf(rowItem), 1);
            });
        }else{
            angular.forEach($scope.dataRecSelect, function(rowItem) {
                angular.copy($scope.dataRecSelectOld[0],$scope.dataRec[$scope.dataRec.indexOf(rowItem)]);
            });
        }
        angular.element('#window-modal').modal('hide');
    }

    $scope.ShowFilter = function() {
        angular.element('#window-filter').modal(
            {
                top: '150px',
                backdrop: false,
                keyboard: false
            }
        );
    };

    $scope.Reload = function() {
        $scope.LoadGrid();
        $scope.gridOptions.ngGrid.buildColumns();
    };

    $scope.Save = function() {
        toaster.pop('success', "Proses Simpan", "Proses Simpan berhasil");
        if ($scope.add){
            var grid = $scope.gridOptions.ngGrid;
            grid.$viewport.scrollTop(grid.rowMap[ $scope.dataRec.length-1] * grid.config.rowHeight);
        }
        angular.element('#window-modal').modal('hide');
    };

    $scope.Print = function() {
        print_preview('http://lokal.com/latihan/theme-angular/assets/app/awal.js', '');
    };
    
});