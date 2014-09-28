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
	});


	scope.editPost = function (i) {

		scope.setEditFormActive(i);
		scope.showAddForm = false;

		scope.newPost.description = scope.posts[i].description;
		scope.newPost.hours = scope.posts[i].hours;
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





/*
	/*
    
    var scope = this;

    scope.projects = [];
    scope.activities = [];
    scope.inEditMode = false;
    scope.activity = "";

    $http.get('./data/projects.json').sucess(function (data) {
		scope.projects = data;
	});

	$http.get('./data/activities.json').success(function (data) {
		scope.activities = data;
	});

    scope.days = [];
    scope.newPost = {};

	$http.get('./data/days.json').success(function (data) {
		scope.days = data;
	});


	


	this.addTask = function (dayId) {

		if (scope.activity === "edit") {
			this.saveTask(scope.newPost, scope.dayId, scope.taskId);
		}
		this.setAddFormActive(dayId);
		scope.activity = "add";
	}

	this.setAddFormActive = function (dayId) {
		this.hideAllEditForms();

		for (var i = 0; i < scope.days.length; i++) {
			if (scope.days[i].id === dayId) {
				scope.days[i].inEditingMode = "true";
			} else {
				scope.days[i].inEditingMode = "false";
			}
		}
	}

	this.isAddFormVisible = function (dayId) {
		for (var i = 0; i < scope.days.length; i++) {
			if (scope.days[i].id === dayId && scope.days[i].inEditingMode === "true") {
				return true;
			}	
		}
	}

	this.hideAllAddForms = function () {
		for (var i = 0; i < scope.days.length; i++) {
			scope.days[i].inEditingMode = "false";	
		}
	}


	this.editTask = function (taskId, dayId) {
		this.hideAllAddForms();
		this.setEditFormActive(taskId, dayId);
		scope.activity = "edit";
		scope.taskId = taskId;
		scope.dayId = dayId;

		for (var i = 0; i < scope.days.length; i++) {
			if (scope.days[i].id === dayId) {
				scope.newPost.name = scope.days[i].tasks[taskId].name;
				scope.newPost.activity = scope.days[i].tasks[taskId].activity;
				scope.newPost.description = scope.days[i].tasks[taskId].description;
				scope.newPost.hours = scope.days[i].tasks[taskId].hours;
			}
		}
	}
		
	this.setEditFormActive = function (taskId, dayId) {
		for (var i = 0; i < scope.days.length; i++) {
			for (var y = 0; y < scope.days[i].tasks.length; y++) {
				if (y === taskId && scope.days[i].id === dayId) {
					scope.days[i].tasks[y].inEditingMode = "true";
				} else {
					scope.days[i].tasks[y].inEditingMode = "false";
				}
			}
		}
	}

	this.isEditFormVisible = function (taskId, dayId) {
		for (var i = 0; i < scope.days.length; i++) {
			for (var y = 0; y < scope.days[i].tasks.length; y++) {
				if (y === taskId && scope.days[i].id === dayId && scope.days[i].tasks[y].inEditingMode === "true") {
					return true;
				}	
			}
		}
	}

	this.hideAllEditForms = function () {
		for (var i = 0; i < scope.days.length; i++) {
			for (var y = 0; y < scope.days[i].tasks.length; y++) {
				scope.days[i].tasks[y].inEditingMode = "false";
			}	
		}
	}

	this.saveTask = function (newPost, dayId, taskId) {
		if (scope.activity === "edit") {
			this.hideAllEditForms();
			for (var i = 0; i < scope.days.length; i++) {
				if (scope.days[i].id === dayId) {
					scope.days[i].tasks[taskId] = newPost;
				}
			}
		} else if (scope.activity === "add"){
			for (var i = 0; i < scope.days.length; i++) {
				if (scope.days[i].id === dayId) {
					scope.days[i].tasks.push(newPost);
				}
			}
		}
		scope.newPost = {};

		if (scope.activity === "edit") {
			scope.activity = "";
		}
	}


	this.deleteTask = function (taskId, dayId) {
		for (var i = 0; i < scope.days.length; i++) {
			if (scope.days[i].id === dayId) {
				scope.days[i].tasks.splice(taskId, 1);
			}
		}
	}
	*/
}]);
