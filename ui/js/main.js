define('main', ['jquery', 'slideshow', 'movingmap', 'activify', 'ajaxloader', 'lazyload'],

    function ($, Slideshow, MovingMap, Activify, Ajaxloader, Lazyload) {
    'use strict';

	var main = {

		documentSetup : function () {
			$('html').addClass('js');
		},

		initApps : function () {
			Slideshow.start();
			Activify.start();
			Lazyload.start();

			
			if (window.location.search === "") {
				Ajaxloader.start();
			}
			
			MovingMap.start();
		},

		start : function () {
			this.documentSetup();
			this.initApps();
		}
	};


	$(document).ready(function () {
		main.start();
	});
    
});