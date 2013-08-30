'use strict';

/* Directives */

var directives = angular.module('radio.directives', []);

directives.directive('pagination', function() {
	return {
		template: '<div id="paging-div"><button ng-disabled="currentPage == 0" class="previous-next-button button button-rounded button-flat-primary button-tiny" ng-click="prevPage()">Previous</button>' +
    			  '{{currentPage+1}}/{{numPages()}}' +
                  '<button ng-disabled="currentPage>= numPages() - 1" class="previous-next-button button button-rounded button-flat-primary button-tiny" ng-click="nextPage()">Next</button></div>',
		replace: 'true',
		restrict: 'EA',
		scope: {
			pageSize: '=',
			count: '=',
		},
    	link: function($scope, element, attrs) {
			$scope.$parent.currentPage = $scope.currentPage = 0;
			$scope.$parent.pageSize = $scope.pageSize;
			$scope.$watch('count', function() {
				$scope.$parent.currentPage = $scope.currentPage = 0;
			});

			$scope.numPages = function () {
				return Math.ceil($scope.count / $scope.pageSize); 
			}
			$scope.nextPage = function () {
				$scope.$parent.currentPage = $scope.currentPage = $scope.currentPage + 1;
			}
			$scope.prevPage = function () {
				$scope.$parent.currentPage = $scope.currentPage = $scope.currentPage - 1;				
			}
		}		
	}
});
	        