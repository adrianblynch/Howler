define('main-menu', ['jquery'], 
	function ($) {
	'use strict';

    var mainMenu = {

    	setup : function () {
			var trigger = $('.main--nav-trigger'),
				target = $('.main--nav-target');
				

			trigger.bind('click', function (e) {
				e.preventDefault();
				toggleMenu();
			});

			function toggleMenu() {
				if (target.hasClass('active')) {
					target.removeClass('active');
				} else {
					target.addClass('active');
				}
			}

		
		},

		start : function () {
			if ($('.main--nav-trigger').length) {
				this.setup();
			}
		}

    };

    return mainMenu;

});