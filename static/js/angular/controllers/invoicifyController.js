angular.module('invoicify')
    .controller('InvoicifyController', ['$http', function($http){

    var scope = this;
    scope.posts = [];
    scope.newPost = {};
    scope.activity = "";
    scope.activePostId = "";
    scope.showAddForm = false;
    


    $http.get('/static/js/angular/data/posts.json').success(function (data) {
		scope.posts = data;
		scope.setTotals();
	});


	scope.editPost = function (i) {

		scope.setEditFormActive(i);
		scope.showAddForm = false;

		scope.newPost.description = scope.posts[i].description;
		scope.newPost.amount = scope.posts[i].amount;
		scope.newPost.price = scope.posts[i].price;
		
		scope.activity = "edit";
		scope.activePostId = i;
	}

	
	scope.deletePost = function (i) {
		scope.posts.splice(i, 1);
	}

	scope.savePost = function (newPost, i) {
		if (scope.activity === "edit") {
			scope.posts[i] = newPost;		
		} else if (scope.activity === "add"){
			scope.posts.push(newPost);
		}

		scope.setTotals();
		scope.newPost = {};

		if (scope.activity === "edit") {
			scope.activity = "";
		}
	}

	scope.addPost = function () {
		
		scope.showAddForm = true;
		scope.hideAllEditForms();
		scope.activity = "add";

		if (scope.activity === "edit") {
			scope.saveTask(scope.newPost, scope.activePostId);
			scope.newPost = {};
		}
		
		scope.setAddFormActive();
	}

	scope.setAddFormActive = function () {
		scope.hideAllEditForms();
	}
	
	scope.isAddTaskFormVisible = function () {
		if (scope.showAddForm === true) {
			return true;
		}
	}

	scope.hideAllEditForms = function () {
		for (var i = 0; i < scope.posts.length; i++ ) {
			scope.posts[i].active = "false";
		}
	}

	scope.isEditFormVisible = function (i) {
		if (scope.posts[i].active === "true") {
			return true;
		}
	}

	scope.setEditFormActive = function (i) {
		scope.hideAllEditForms();
		scope.posts[i].active = "true";
	}

	scope.setTotals = function () {
		for (var i = 0; i < scope.posts.length; i++ ) {
			scope.posts[i].total = (scope.posts[i].amount * scope.posts[i].price);
		}
	}



}]);
