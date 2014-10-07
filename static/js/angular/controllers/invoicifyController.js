angular.module('invoicify')
    .controller('InvoicifyController', ['$scope', '$http', function($scope, $http){

    $scope.mainPosts = [];
    $scope.mainSettings = [];
    $scope.newPost = {};

    $http.get('/static/js/angular/data/mainform.json').success(function (data) {
		$scope.mainPosts = data.posts;
		$scope.mainSettings = data.settings;
		$scope.setTotals($scope.mainPosts);
	});

    /*
	$http.get('/static/js/angular/data/leftrows.json').success(function (data) {
		$scope.leftrows = data;
	});
*/

	$scope.setTotals = function (posts) {
		for (var i = 0; i < posts.length; i++ ) {
			posts[i].total = (posts[i].amount * posts[i].price);
		}
	}

	$scope.editRow = function (i, posts, settings) {
		settings.isAdding = false;
		$scope.interuptEditing(posts, settings);
		posts[i].active = true;
		settings.activePostId = i;
		$scope.newPost = posts[i];
		settings.newPost = $scope.newPost;
		
	}

	$scope.updateRow = function (i, posts, settings, newPost) {
		posts[i] = newPost;
		posts[i].active = false;
		newPost = {};

		if (settings.form === "main") {
			$scope.setTotals(posts);
		}
	}

	$scope.deleteRow = function (i, posts) {
		posts.splice(i, 1);
	}

	$scope.isRowActive = function (i, posts) {
		if (posts[i].active === true) {
			return true;
		}
	}

	$scope.interuptEditing = function (posts, settings) {
		for (var i = 0; i < posts.length; i++ ) {
			if (posts[i].active === true) {
				$scope.updateRow(i, posts, settings, settings.newPost);
			}
		}
	}

	$scope.addRow = function (posts, settings) {
		settings.isAdding = true;
		$scope.newPost = {};
		$scope.interuptEditing(posts, settings);
	}

	$scope.isAddRowActive = function (settings) {
		if (settings.isAdding === true) {
			return true;
		}
	}

	$scope.saveRow = function (i, posts, settings, newPost) {
		posts.push(newPost);
		$scope.newPost = {};
		if (settings.form === "main") {
			$scope.setTotals(posts);
		}
	}



}]);
