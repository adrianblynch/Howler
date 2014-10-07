angular.module('invoicify')
    .controller('InvoicifyController', ['$scope', '$http', function($http){

    var scope = this;
    scope.posts = [];
    scope.settings = [];    

    $http.get('/static/js/angular/data/mainform.json').success(function (data) {
		scope.posts = data.posts;
		scope.postsettings = data.settings;
		scope.setTotals();
	});

	$http.get('/static/js/angular/data/leftrows.json').success(function (data) {
		scope.leftrows = data;
	});

	scope.setTotals = function () {
		for (var i = 0; i < scope.posts.length; i++ ) {
			scope.posts[i].total = (scope.posts[i].amount * scope.posts[i].price);
		}
	}




	scope.editRow = function (i, posts, form) {
		scope.interuptEditing(posts);
		posts[i].active = "true";
		scope.activePostId = i;

		if (form == "main-form") {
			scope.newPost.description = scope.posts[i].description;
			scope.newPost.amount = scope.posts[i].amount;
			scope.newPost.price = scope.posts[i].price;
		} else if (form = "lefttop-form") {
			scope.newPost.description = scope.posts[i].description;
		}
	}

	scope.interuptEditing = function (posts) {
		for (var i = 0; i < posts.length; i++ ) {
			if (posts[i] === "true") {
				posts[i] = "false";
				scope.forceUpdate(posts);
				scope.newPost = {};
			}
		}
	}

	scope.forceUpdate = function (posts) {
		scope.updateRow(scope.newPost, scope.activePostId, posts);
	}

	scope.updateRow = function (newPost, i, posts) {
		posts[i] = newPost;
		posts[i].active = "false";
		scope.newPost = {};

		//If main form
		scope.setTotals();
	}

	

	scope.addRow = function (posts) {
		//What form?
		scope.showAddRow = true;
		scope.interuptEditing(posts);
		
	}

	scope.saveRow = function (newPost, i, posts) {
		posts.push(newPost);
		scope.setTotals();
		scope.newPost = {};
	}

	scope.deleteRow = function (i, posts) {
		posts.splice(i, 1);
	}

	scope.isRowActive = function (i, posts) {
		if (posts[i].active === "true") {
			return true;
		}
	}

	scope.isAddRowActive = function () {
		if (scope.showAddRow === true) {
			return true;
		}
	}




}]);
