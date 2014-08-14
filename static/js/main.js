define(['jquery', 'slideshow', 'mapify', 'main-menu', 'ajaxloader', 'lazyload'],

    function ($, Slideshow, Mapify, MainMenu, Ajaxloader, Lazyload) {
    'use strict';

	var main = {


		documentSetup : function () {
			$('html').addClass('js');
		},

		initApps : function () {
			Slideshow.start();
			MainMenu.start();
			Ajaxloader.start();
			Lazyload.start();
			Mapify.start();
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