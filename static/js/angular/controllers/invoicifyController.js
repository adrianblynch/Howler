angular.module('invoicify')
    .controller('InvoicifyController', ['$scope', '$http', function($scope, $http){

    $scope.mainPosts = [];
    $scope.mainSettings = [];
    $scope.leftFormPosts = [];
    $scope.leftFormSettings = [];
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


	/* ALL FORM FUNCTIONALITY */

	$scope.editRow = function (i, posts, settings) {
		settings.isAddingRow = false;
		$scope.interuptEditing(posts, settings);
		posts[i].active = true;
		$scope.newPost = posts[i];		
	}

	$scope.updateRow = function (i, posts, settings) {
		posts[i] = $scope.newPost;
		$scope.newPost = {};
		posts[i].active = false;

		if (settings.form === "main") {
			$scope.setTotals(posts);
		}
	}

	$scope.addRow = function (posts, settings) {
		settings.isAddingRow = true;
		$scope.newPost = {};
		$scope.interuptEditing(posts, settings);
	}

	$scope.saveRow = function (i, posts, settings) {
		posts.push($scope.newPost);
		$scope.newPost = {};
		if (settings.form === "main") {
			$scope.setTotals(posts);
		}
	}

	$scope.deleteRow = function (i, posts) {
		posts.splice(i, 1);
	}

	$scope.interuptEditing = function (posts, settings) {
		for (var i = 0; i < posts.length; i++ ) {
			if (posts[i].active === true) {
				posts[i].active = false;
				$scope.newPost = {};
				if (settings.form === "main") {
					$scope.setTotals(posts);
				}
			}
		}
	}


	/* MAIN FORM */

	$scope.setTotals = function (posts) {
		for (var i = 0; i < posts.length; i++ ) {
			posts[i].total = (posts[i].amount * posts[i].price);
		}
	}



}]);
