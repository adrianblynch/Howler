define('slideshow', ['jquery'], 
	function ($) {

	'use strict';

    var slideshow = {

    	imagesArray : [],

		slideshowLeftOffset : 0,

		auto : true,

		slideshowWidth : function () {
			return slideshow.element[0].scrollWidth;
		},

		imageWidth : function () {
			return slideshow.element[0].scrollWidth / slideshow.imagesArray.length;
		},

		setup : function () {
			var holder = slideshow.element.find('.slideshow-holder'),
				images = $('img', slideshow.element);

			if (slideshow.enableArrows) {
				slideshow.arrowBack = $('.arrow-back');
				slideshow.arrowForward = $('.arrow-forward');
				slideshow.arrowBack.show();
				slideshow.arrowForward.show();	
			}
			
			//Save images in array
			images.each(function() {
				slideshow.imagesArray.push($(this));
			});

			//Set holder width
			holder.css('width', (slideshow.imagesArray.length * 100) + '%');

			slideshow.resetImages();
			
			slideshow.enableSwipes(); 

		},

		enableSwipes : function () {

			slideshow.element.bind("scroll", function(){
				if (!slideshow.element.hasClass('active')) {
					slideshow.manuelSwipe();
				}
			});
			
			if (slideshow.enableArrows) {
				slideshow.arrowBack.bind('click', function (e) {
					e.preventDefault();
					if (!slideshow.element.hasClass('active')) {
						slideshow.auto = false;
						slideshow.backAnimation();
					}
				});

				slideshow.arrowForward.bind('click', function (e) {
					e.preventDefault();
					if (!slideshow.element.hasClass('active')) {
						slideshow.auto = false;
						slideshow.forwardAnimation();
					}
				});
			}

			slideshow.disableAutoSwipe();

			if (slideshow.auto === true) {
				slideshow.autoSwipe();
			}

			slideshow.element.removeClass('active');
		},

		disableSwipes : function () {
			slideshow.element.addClass('active');
    	}, 

    	autoSwipe : function () {
    		var interval = setInterval(function(){
    			slideshow.forwardAnimation();
    		}, 5000);

    		slideshow.interval = interval;
    	},

    	disableAutoSwipe : function () {
    		clearInterval(slideshow.interval);
    	},

		manuelSwipe : function () {

			if (slideshow.slideshowLeftOffset !== slideshow.element[0].scrollLeft) {
				slideshow.auto = false;
			}

			slideshow.preventScrollTooFar();

	        //If swipe half the picture - Wait until swipe stopped, then do animation
			clearTimeout($.data(slideshow, 'scrollTimer'));
			$.data(slideshow, 'scrollTimer', setTimeout(function() {

				
				if (slideshow.slideshowLeftOffset < slideshow.element[0].scrollLeft) {
					slideshow.disableSwipes();
					slideshow.forwardAnimation();
				} else if (slideshow.slideshowLeftOffset > slideshow.element[0].scrollLeft) {
					slideshow.disableSwipes();
					slideshow.backAnimation();
				}			

			}, 30));
		},

		preventScrollTooFar : function () {

			//If swipe the whole picture - STOP
			if (slideshow.slideshowLeftOffset < slideshow.element[0].scrollLeft) {
	        	if (slideshow.element[0].scrollLeft >= (slideshow.imageWidth() * 2)) {
	        		slideshow.element[0].scrollLeft = slideshow.imageWidth() * 2;
	        		slideshow.resetImages('forward');
	        	}
	        } else if (slideshow.slideshowLeftOffset > slideshow.element[0].scrollLeft) {
	        	if (slideshow.element[0].scrollLeft === 0) {
	        		slideshow.element[0].scrollLeft = 0;
	        		slideshow.resetImages('back');
	        	}
	        }
		},

		forwardAnimation : function () {
    		slideshow.disableSwipes();
			slideshow.animation('forward', slideshow.imageWidth() * 2);
    	},

    	backAnimation : function () {
    		slideshow.disableSwipes();
			slideshow.animation('back', 0);
    	},

    	animation : function (direction, goToOffset) {
    		slideshow.element.animate({scrollLeft: goToOffset}, 400, function() {
				clearTimeout($.data(slideshow, 'scrollTimer'));
    			$.data(slideshow, 'scrollTimer', setTimeout(function() {
					slideshow.resetImages(direction);
				}, 10));
			});
    	},

    	resetImages : function (direction) {	
    		var holder = slideshow.element.find('.slideshow-holder'),
    			i,
    			images,
    			htmlString = '';

			// Always make to current image number 2 in imagesArray. 
			// Replace html string with current array
			if (direction == 'forward') {
				slideshow.imagesArray.push(slideshow.imagesArray[0]);
				slideshow.imagesArray.shift();
			} else {
				slideshow.imagesArray.unshift(slideshow.imagesArray[slideshow.imagesArray.length - 1]);
				slideshow.imagesArray.pop();
			}
			
			for (i = 0; i < slideshow.imagesArray.length; i++) {
				htmlString = htmlString + slideshow.imagesArray[i][0].outerHTML;
			}

			holder.html(htmlString);

			images = $('img', holder);
			images.css('width', (100 / slideshow.imagesArray.length) + '%');
			slideshow.element.scrollLeft(slideshow.imageWidth());
			slideshow.slideshowLeftOffset = slideshow.imageWidth();

			slideshow.enableSwipes();
    	},

		start : function () {

			if ($(window).width() > 479) {
				slideshow.enableArrows = true;
			}

			if ($('.slideshow img').length === 2) {
				$('.slideshow img:last-child').remove();
			} else if ($('.slideshow').length && $('.slideshow img').length > 2 && $('.slideshow .cms_placeholder').length !== 1) {
				slideshow.element = $('.slideshow');
				slideshow.setup();
			}			
		}

    };

    return slideshow;

});