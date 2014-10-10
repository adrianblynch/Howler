angular.module('invoicify')
    .controller('InvoicifyController', ['$scope', '$http', function($scope, $http){

    $scope.mainPosts = [];
    $scope.mainSettings = [];
    $scope.leftFormPosts = [];
    $scope.leftFormSettings = [];
    $scope.rightFormPosts = [];
    $scope.rightFormSettings = [];
    $scope.belowFormPosts = [];
    $scope.belowFormSettings = [];
    $scope.newPost = {};

    $http.get('/static/js/angular/data/mainform.json').success(function (data) {
		$scope.mainPosts = data.posts;
		$scope.mainSettings = data.settings;
		$scope.setTotals($scope.mainPosts);
	});
    
	$http.get('/static/js/angular/data/leftform.json').success(function (data) {
		$scope.leftFormPosts = data.posts;
		$scope.leftFormSettings = data.settings;
	});

	$http.get('/static/js/angular/data/rightform.json').success(function (data) {
		$scope.rightFormPosts = data.posts;
		$scope.rightFormSettings = data.settings;
	});

	$http.get('/static/js/angular/data/belowform.json').success(function (data) {
		$scope.belowFormPosts = data.posts;
		$scope.belowFormSettings = data.settings;
	});


	/* ALL FORM FUNCTIONALITY */

	$scope.editRow = function (i, posts, settings) {
		$scope.hideRows();
		$scope.resetValues();
		posts[i].active = true;
		$scope.newPost = posts[i];		
	}
	$scope.addRow = function (settings) {
		$scope.hideRows();
		$scope.resetValues();
		settings.isAddingRow = true;
	}

	$scope.updateRow = function (i, posts, settings) {
		posts[i] = $scope.newPost;
		posts[i].active = false;

		$scope.resetValues();
	}

	$scope.saveRow = function (i, posts, settings) {
		posts.push($scope.newPost);
		settings.isAddingRow = false;

		$scope.resetValues();
	}

	$scope.deleteRow = function (i, posts) {
		posts.splice(i, 1);
	}

	$scope.hideRows = function (){
		$scope.interuptEditing();
		$scope.interuptAdding();
	}

	$scope.resetValues = function () {
		$scope.setTotals($scope.mainPosts);
		$scope.newPost = {};
	}

	$scope.interuptEditing = function () {
		for (var i = 0; i < $scope.mainPosts.length; i++ ) {
			$scope.mainPosts[i].active = false;
		}
		for (var i = 0; i < $scope.leftFormPosts.length; i++ ) {
			$scope.leftFormPosts[i].active = false;
		}
		for (var i = 0; i < $scope.rightFormPosts.length; i++ ) {
			$scope.rightFormPosts[i].active = false;
		}
		for (var i = 0; i < $scope.belowFormPosts.length; i++ ) {
			$scope.belowFormPosts[i].active = false;
		}
	}

	$scope.interuptAdding = function () {
		$scope.mainSettings.isAddingRow = false;
		$scope.leftFormSettings.isAddingRow = false;
		$scope.rightFormSettings.isAddingRow = false;
		$scope.belowFormSettings.isAddingRow = false;
	}


	/* MAIN FORM */

	$scope.setTotals = function (posts) {
		for (var i = 0; i < posts.length; i++ ) {
			posts[i].total = (posts[i].amount * posts[i].price);
		}
	}



}]);
