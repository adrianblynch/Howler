define(['jquery', 'slideshow', 'mapify', 'activify', 'ajaxloader', 'lazyload'],

    function ($, Slideshow, Mapify, Activify, Ajaxloader, Lazyload) {
    'use strict';

	var main = {


		documentSetup : function () {
			$('html').addClass('js');
		},

		initApps : function () {
			Slideshow.start();
			Activify.start();
			Ajaxloader.start();
			Lazyload.start();
			//Mapify.start();
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