define('init', ['jquery', 'slideshow', 'mapify', 'activify', 'ajaxloader', 'lazyload'],

    function ($, Slideshow, Mapify, Activify, Ajaxloader, Lazyload) {
    'use strict';

	var init = {


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
			
			//Mapify.start();
		},

		start : function () {
			this.documentSetup();
			this.initApps();
		}
	};

	return init;
    
});