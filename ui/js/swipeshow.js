define('swipeshow', ['jquery'], 
	function ($) {

	'use strict';

    var swipeshow = {

    	imagesArray : [],

		swipeshowLeftOffset : 0,

		auto : true,

		swipeshowWidth : function () {
			return swipeshow.element[0].scrollWidth;
		},

		imageWidth : function () {
			return Math.floor(swipeshow.element[0].scrollWidth / swipeshow.imagesArray.length);
		},

		setup : function () {
			var images = $('img', swipeshow.element);

			if (swipeshow.enableArrows) {
				swipeshow.arrowBack = $('.arrow-back');
				swipeshow.arrowForward = $('.arrow-forward');
				swipeshow.arrowBack.show();
				swipeshow.arrowForward.show();	
			}
			
			//Save images in array
			images.each(function() {
				swipeshow.imagesArray.push($(this));
			});

			//Set holder width
			swipeshow.holder.css('width', (swipeshow.imagesArray.length * 100) + '%');

			swipeshow.resetImages();
			
		},

		resetImages : function (direction) {	
    		var i,
    			images,
    			htmlString = '';
    			
			// Current image is always number 2 in imagesArray. 
			// Replace html string with current array
			if (direction === 'forward') {
				swipeshow.imagesArray.push(swipeshow.imagesArray[0]);
				swipeshow.imagesArray.shift();
			} else {
				swipeshow.imagesArray.unshift(swipeshow.imagesArray[swipeshow.imagesArray.length - 1]);
				swipeshow.imagesArray.pop();
			}
			
			for (i = 0; i < swipeshow.imagesArray.length; i++) {
				htmlString = htmlString + swipeshow.imagesArray[i][0].outerHTML;
			}

			swipeshow.holder.html(htmlString);

			images = $('img', swipeshow.holder);
			images.css('width', (100 / swipeshow.imagesArray.length) + '%');
			swipeshow.element.scrollLeft(swipeshow.imageWidth());
			swipeshow.swipeshowLeftOffset = swipeshow.imageWidth();

			swipeshow.enableSwipes();
    	},

		enableSwipes : function () {

			swipeshow.element.bind("scroll", function(){
				if (!swipeshow.element.hasClass('active')) {
					swipeshow.manuelSwipe();
				}
			});
			
			if (swipeshow.enableArrows) {
				swipeshow.arrowBack.bind('click', function (e) {
					e.preventDefault();
					if (!swipeshow.element.hasClass('active')) {
						swipeshow.auto = false;
						swipeshow.backAnimation();
					}
				});

				swipeshow.arrowForward.bind('click', function (e) {
					e.preventDefault();
					if (!swipeshow.element.hasClass('active')) {
						swipeshow.auto = false;
						swipeshow.forwardAnimation();
					}
				});
			}

			swipeshow.disableAutoSwipe();

			if (swipeshow.auto === true) {
				swipeshow.autoSwipe();
			}

			swipeshow.element.removeClass('active');
		},

		disableSwipes : function () {
			swipeshow.element.addClass('active');
    	}, 

    	autoSwipe : function () {
    		var interval = setInterval(function(){
    			swipeshow.forwardAnimation();
    		}, 5000);

    		swipeshow.interval = interval;
    	},

    	disableAutoSwipe : function () {
    		clearInterval(swipeshow.interval);
    	},

		manuelSwipe : function () {

			if (swipeshow.swipeshowLeftOffset !== swipeshow.element[0].scrollLeft) {
				swipeshow.auto = false;
			}

			swipeshow.preventScrollTooFar();

	        //If swipe half the picture - Wait until swipe stopped, then do animation
			clearTimeout($.data(swipeshow, 'scrollTimer'));
			$.data(swipeshow, 'scrollTimer', setTimeout(function() {

				
				if (swipeshow.swipeshowLeftOffset < swipeshow.element[0].scrollLeft) {
					swipeshow.disableSwipes();
					swipeshow.forwardAnimation();
				} else if (swipeshow.swipeshowLeftOffset > swipeshow.element[0].scrollLeft) {
					swipeshow.disableSwipes();
					swipeshow.backAnimation();
				}			

			}, 30));
		},

		preventScrollTooFar : function () {

			//If swipe the whole picture - STOP
			if (swipeshow.swipeshowLeftOffset < swipeshow.element[0].scrollLeft) {
	        	if (swipeshow.element[0].scrollLeft >= (swipeshow.imageWidth() * 2)) {
	        		swipeshow.element[0].scrollLeft = swipeshow.imageWidth() * 2;
	        		swipeshow.resetImages('forward');
	        	}
	        } else if (swipeshow.swipeshowLeftOffset > swipeshow.element[0].scrollLeft) {
	        	if (swipeshow.element[0].scrollLeft === 0) {
	        		swipeshow.element[0].scrollLeft = 0;
	        		swipeshow.resetImages('back');
	        	}
	        }
		},

		forwardAnimation : function () {
    		swipeshow.disableSwipes();
			swipeshow.animation('forward', swipeshow.imageWidth() * 2);
    	},

    	backAnimation : function () {
    		swipeshow.disableSwipes();
			swipeshow.animation('back', 0);
    	},

    	animation : function (direction, goToOffset) {
    		swipeshow.element.animate({scrollLeft: goToOffset}, 400, function() {
				clearTimeout($.data(swipeshow, 'scrollTimer'));
    			$.data(swipeshow, 'scrollTimer', setTimeout(function() {
					swipeshow.resetImages(direction);
				}, 10));
			});
    	},

		start : function () {

			if ($('.slideshow img').length === 2) {
				$('.slideshow img:last-child').remove();
			} else if ($('.slideshow').length && $('.slideshow img').length > 2 && $('.slideshow .cms_placeholder').length !== 1) {
				swipeshow.element = $('.slideshow');
				swipeshow.holder = swipeshow.element.find('.slideshow-holder');
				if ($(window).width() > 479) {
					swipeshow.enableArrows = true;
				}
				swipeshow.setup();

			}			
		}

    };

    return swipeshow;

});