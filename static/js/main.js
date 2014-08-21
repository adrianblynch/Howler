define(['jquery', 'init', 'slideshow', 'mapify', 'activify', 'ajaxloader', 'lazyload'],

    function ($, Init, Slideshow, Mapify, Activify, Ajaxloader, Lazyload) {
    'use strict';

	var main = {

		start : function () {
			Init.start();
		}
	};


	$(document).ready(function () {
		main.start();
	});
    
});