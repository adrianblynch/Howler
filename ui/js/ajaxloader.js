define('ajaxloader', ['jquery', 'lazyload', 'mapify'],

	function ($, Lazyload, Mapify) {

	'use strict';

	var ajaxloader = {

		loading : false,

		setup : function () {

			if ($('.ajax-loader').length) {
				$('.ajax-loader').show();
				ajaxloader.loaderDiv = $('.ajax-loader');
				ajaxloader.loading = false;		
			}

			$('.step-links').hide();
				
		},

		scroll : function () {

			var y;

			$(window).bind('scroll.ajaxloader', function () {
            	y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
				if (y + $(window).height() >= $(document).height() && ajaxloader.loading === false) {
					ajaxloader.loading = true;
					ajaxloader.loadPosts();
				}
    		});
		},

		loadPosts : function () {
			var loaderData = ajaxloader.loaderDiv.data(),
				holder = loaderData.holder,
				populateholder = loaderData.populateholder,
				url = loaderData.url,
				currentPagination = ajaxloader.loaderDiv.parents('.posts--pagination'),
				posts;

			$.ajax({
				url:url,
				type:'GET',
				success: function(data){

					posts = $(data).find(holder).html();
					$(populateholder).append(posts);
					currentPagination.remove();

					if (window.location.search === "") {
						ajaxloader.start();
					}
				}
			});
		},

		accessability : function () {
			$('.ajax-loader--image').bind('click', function (e){
				e.preventDefault();
				window.scrollTo(0,document.body.scrollHeight);
			});
		},

		start : function () {
			if ($('.posts--pagination').length) {
				this.setup();
				this.scroll();
				this.accessability();
			}


		}		
	};

	return ajaxloader;
});