define('activify', ['jquery', 'movingmap'], 
	function ($, MovingMap) {
	'use strict';

    var activify = {

    	setup : function (trigger, target, keyword) {
				
			trigger.bind('click', function (e) {
				e.preventDefault();
				activify();
				if (keyword === 'initmap') {
					MovingMap.initOnResizeMap();
				}
			});

			function activify() {
				if (target.hasClass('active')) {
					target.removeClass('active');
				} else {
					target.addClass('active');
				}
				
			}		
		},

		start : function () {
			if ($('.main--nav-trigger').length) {
				this.setup($('.main--nav-trigger'), $('.main--nav-target'));
			}

			if ($('.aside--trigger').length) {
				this.setup($('.aside--trigger'), $('.aside--target'), 'initmap');
			}
		}

    };

    return activify;

});