angular.module('invoicify')
    .controller('InvoicifyController', ['$http', function($http){

    var scope = this;
    scope.posts = [];
    scope.dummyRow = {};
    scope.activity = "";
    scope.activePostId = "";
    scope.showAddForm = false;
    

    $http.get('/static/js/angular/data/posts.json').success(function (data) {
		scope.posts = data;
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



	
	scope.isAddRowActive = function () {
		if (scope.showAddRow === true) {
			return true;
		}
	}

	scope.editRow = function (i, posts, form) {
		scope.stopEditingAllRows(posts);
		scope.forceUpdate(posts);
		posts[i].active = "true";
		scope.activePostId = i;

		if (form == "main-form") {
			scope.dummyRow.description = scope.posts[i].description;
			scope.dummyRow.amount = scope.posts[i].amount;
			scope.dummyRow.price = scope.posts[i].price;
		} else if (form = "lefttop-form") {
			scope.dummyRow.description = scope.posts[i].description;
		}
	}

	scope.updateRow = function (dummyRow, i, posts) {
		posts[i] = dummyRow;
		scope.setTotals();
		scope.dummyRow = {};
		scope.stopEditingAllRows(posts);
	}

	scope.forceUpdate = function (posts) {
		scope.updateRow(scope.dummyRow, scope.activePostId, posts);
	}

	scope.addRow = function (posts) {
		scope.showAddRow = true;
		scope.stopEditingAllRows(posts);
		scope.forceUpdate(posts);
		scope.dummyRow = {};
	}

	scope.saveRow = function (dummyRow, i, posts) {
		posts.push(dummyRow);
		scope.setTotals();
		scope.dummyRow = {};
	}

	scope.deleteRow = function (i, posts) {
		posts.splice(i, 1);
	}

	scope.isRowActive = function (i, posts) {
		if (posts[i].active === "true") {
			return true;
		}
	}

	scope.stopEditingAllRows = function (posts) {
		console.log('sdd');
		for (var i = 0; i < posts.length; i++ ) {
			posts[i].active = "false";
		}	
	}

	

	



}]);
