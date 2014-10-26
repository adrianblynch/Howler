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
    $scope.onlyNumbers = /^\d+$/;

    $http.get('/static/js/angular/data/mainform.json').success(function (data) {
		$scope.mainPosts = data.posts;
		$scope.mainSettings = data.settings;
		$scope.setTotals();
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



	$scope.saveForm = function (posts, settings) {
		settings.inEditMode = false;

		if (settings.form === "main") {
			$scope.setTotals();
			$scope.validate(posts);
		}

		//Remove any deleted items
		for (var i = 0; i < posts.length; i++) {
			if (posts[i].description === "") {
				posts.splice(i, 1);
			}
		}

		//Reset ID:s
		for (var i = 0; i < posts.length; i++) {
			posts[i].id = i;
		}

	};

	$scope.addRow = function (posts, settings) {

		var newObj = {
			"id" : posts.length,
			"description" : ""
		};

		if (settings.form == "main") {
			newObj = {
				"id" : posts.length,
				"description" : "",
				"amount" : 1,
				"price" : 0,
				"total" : 0
			};
		}

		posts.push(newObj);

	};

	$scope.setTotals = function () {
		for (var i = 0; i < $scope.mainPosts.length; i++ ) {
			$scope.mainPosts[i].total = ($scope.mainPosts[i].amount * $scope.mainPosts[i].price);
			$scope.mainSettings.total = $scope.mainSettings.total + $scope.mainPosts[i].total;
		}

		$scope.mainSettings.tax = ($scope.mainSettings.total * ($scope.mainSettings.taxrate / 100));
		$scope.mainSettings.topay = $scope.mainSettings.total + $scope.mainSettings.tax;

	};

	$scope.validate = function () {
		if (true) {
			//Add validation
		}
	};


}]);
