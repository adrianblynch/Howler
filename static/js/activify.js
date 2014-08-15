define('activify', ['jquery', 'mapify'], 
	function ($, Mapify) {
	'use strict';

    var activify = {

    	setup : function (trigger, target, keyword) {
				
			trigger.bind('click', function (e) {
				e.preventDefault();
				activify();
			});

			function activify() {
				if (target.hasClass('active')) {
					target.removeClass('active');
				} else {
					target.addClass('active');
					if (keyword === 'map') {
						Mapify.activify();
					}
				}
			}		
		},

		start : function () {
			if ($('.main--nav-trigger').length) {
				this.setup($('.main--nav-trigger'), $('.main--nav-target'));
			}

			if ($('.aside--trigger').length) {

				this.setup($('.aside--trigger'), $('.aside--target'), 'map');
			}
		}

    };

    return activify;

});