angular.module('invoicify')
    .controller('InvocifyController', ['$http', function($http){

    var invoice = this;

    invoice.posts = [];

    $http.get('static/js/angular/data/posts.json').success(function (data) {
		invoice.posts = data;
	});

	/*
    
    var board = this;

    board.projects = [];
    board.activities = [];
    board.inEditMode = false;
    board.activity = "";

    $http.get('./data/projects.json').success(function (data) {
		board.projects = data;
	});

	$http.get('./data/activities.json').success(function (data) {
		board.activities = data;
	});

    board.days = [];
    board.newTask = {};

	$http.get('./data/days.json').success(function (data) {
		board.days = data;
	});


	


	this.addTask = function (dayId) {

		if (board.activity === "edit") {
			this.saveTask(board.newTask, board.dayId, board.taskId);
		}
		this.setAddFormActive(dayId);
		board.activity = "add";
	}

	this.setAddFormActive = function (dayId) {
		this.hideAllEditForms();

		for (var i = 0; i < board.days.length; i++) {
			if (board.days[i].id === dayId) {
				board.days[i].inEditingMode = "true";
			} else {
				board.days[i].inEditingMode = "false";
			}
		}
	}

	this.isAddFormVisible = function (dayId) {
		for (var i = 0; i < board.days.length; i++) {
			if (board.days[i].id === dayId && board.days[i].inEditingMode === "true") {
				return true;
			}	
		}
	}

	this.hideAllAddForms = function () {
		for (var i = 0; i < board.days.length; i++) {
			board.days[i].inEditingMode = "false";	
		}
	}


	this.editTask = function (taskId, dayId) {
		this.hideAllAddForms();
		this.setEditFormActive(taskId, dayId);
		board.activity = "edit";
		board.taskId = taskId;
		board.dayId = dayId;

		for (var i = 0; i < board.days.length; i++) {
			if (board.days[i].id === dayId) {
				board.newTask.name = board.days[i].tasks[taskId].name;
				board.newTask.activity = board.days[i].tasks[taskId].activity;
				board.newTask.description = board.days[i].tasks[taskId].description;
				board.newTask.hours = board.days[i].tasks[taskId].hours;
			}
		}
	}
		
	this.setEditFormActive = function (taskId, dayId) {
		for (var i = 0; i < board.days.length; i++) {
			for (var y = 0; y < board.days[i].tasks.length; y++) {
				if (y === taskId && board.days[i].id === dayId) {
					board.days[i].tasks[y].inEditingMode = "true";
				} else {
					board.days[i].tasks[y].inEditingMode = "false";
				}
			}
		}
	}

	this.isEditFormVisible = function (taskId, dayId) {
		for (var i = 0; i < board.days.length; i++) {
			for (var y = 0; y < board.days[i].tasks.length; y++) {
				if (y === taskId && board.days[i].id === dayId && board.days[i].tasks[y].inEditingMode === "true") {
					return true;
				}	
			}
		}
	}

	this.hideAllEditForms = function () {
		for (var i = 0; i < board.days.length; i++) {
			for (var y = 0; y < board.days[i].tasks.length; y++) {
				board.days[i].tasks[y].inEditingMode = "false";
			}	
		}
	}

	this.saveTask = function (newTask, dayId, taskId) {
		if (board.activity === "edit") {
			this.hideAllEditForms();
			for (var i = 0; i < board.days.length; i++) {
				if (board.days[i].id === dayId) {
					board.days[i].tasks[taskId] = newTask;
				}
			}
		} else if (board.activity === "add"){
			for (var i = 0; i < board.days.length; i++) {
				if (board.days[i].id === dayId) {
					board.days[i].tasks.push(newTask);
				}
			}
		}
		board.newTask = {};

		if (board.activity === "edit") {
			board.activity = "";
		}
	}


	this.deleteTask = function (taskId, dayId) {
		for (var i = 0; i < board.days.length; i++) {
			if (board.days[i].id === dayId) {
				board.days[i].tasks.splice(taskId, 1);
			}
		}
	}
	*/
}]);
