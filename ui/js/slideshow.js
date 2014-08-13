define('slideshow', ['jquery'], 
	function ($) {

	'use strict';

    var slideshow = {

    	imagesArray : [],

		currentOffset : 0,

		slideshowWidth : function () {
			return slideshow.s[0].scrollWidth;
		},

		imageWidth : function () {
			return slideshow.s[0].scrollWidth / slideshow.imagesArray.length;
		},

		setup : function () {
			var holder = slideshow.s.find('.slideshow-holder'),
				images = $('img', slideshow.s);

			slideshow.reset();

			//Save images in array
			images.each(function() {
				slideshow.imagesArray.push($(this));
			});

			//Set holder width
			holder.css('width', (slideshow.imagesArray.length * 100) + '%');

			//Bind scroll event
			slideshow.s.bind("scroll.slideshow", function(){
				slideshow.scrollSetup();
			});

			//Set images
			slideshow.resetImages();

		},

		reset : function () {
    		slideshow.s.unbind("scroll.slideshow");
			slideshow.breakScroll = false;
    	}, 

		scrollSetup : function () {

			slideshow.preventScrollTooFar();

    		//When user stopped scrolling - do scroll
			clearTimeout($.data(slideshow, 'scrollTimer'));
			$.data(slideshow, 'scrollTimer', setTimeout(function() {
				if (slideshow.currentOffset < slideshow.s[0].scrollLeft) {
					slideshow.reset();
					slideshow.scroll('forward');
				} else if (slideshow.currentOffset > slideshow.s[0].scrollLeft) {
					slideshow.reset();
					slideshow.scroll('back');
				}			        
			}, 250));
		},

    	preventScrollTooFar : function () {

    		if (slideshow.currentOffset < slideshow.s[0].scrollLeft) {
	        	if (slideshow.s[0].scrollLeft >= (slideshow.imageWidth() * 2)) {
	        		slideshow.s[0].scrollLeft = slideshow.imageWidth() * 2;
	        		slideshow.resetImages('forward');
	        	}
	        } else if (slideshow.currentOffset > slideshow.s[0].scrollLeft) {
	        	if (slideshow.s[0].scrollLeft === 0) {
	        		slideshow.s[0].scrollLeft = 0;
	        		slideshow.resetImages('back');
	        	}
	        }
    	},

    	scroll : function (direction) {

    		var i,
    			goToOffset;			

			//Look for closest image
			for (i = 0; i < slideshow.imagesArray.length; i++) {
	        	if (slideshow.s[0].scrollLeft < (slideshow.imageWidth() * i) && slideshow.breakScroll === false) {

	        		if (direction === 'forward') {
						goToOffset = slideshow.imageWidth() * i;
					} else if (direction === 'back'){
						goToOffset = (slideshow.imageWidth() * i) - slideshow.imageWidth();
					}

					slideshow.animation(direction, goToOffset);
	        		
	        		slideshow.breakScroll = true;
	        	}
	        }
    	},

    	animation : function (direction, goToOffset) {
    		//Make animation an do resetup
    		slideshow.s.animate({scrollLeft: goToOffset}, 400, function() {
				clearTimeout($.data(slideshow, 'scrollTimer'));
    			$.data(slideshow, 'scrollTimer', setTimeout(function() {

						//Bind scroll event
					slideshow.s.bind("scroll.slideshow", function(){
						slideshow.scrollSetup();
					});

					//Set images
					slideshow.resetImages(direction);
					
				}, 10));
			});
    	},

    	resetImages : function (direction) {	
    		var holder = slideshow.s.find('.slideshow-holder'),
    			i,
    			images;

			if (direction == 'forward') {
				slideshow.imagesArray.push(slideshow.imagesArray[0]);
				slideshow.imagesArray.shift();
			} else {
				slideshow.imagesArray.unshift(slideshow.imagesArray[slideshow.imagesArray.length - 1]);
				slideshow.imagesArray.pop();
			}
			
			holder.empty();
			for (i = 0; i < slideshow.imagesArray.length; i++) {
				holder.html(holder.html() + slideshow.imagesArray[i][0].outerHTML);
			}
			images = $('img', holder);
			images.css('width', (100 / slideshow.imagesArray.length) + '%');
			slideshow.s.scrollLeft(slideshow.imageWidth());
			slideshow.currentOffset = slideshow.s[0].scrollLeft;
    	},

		start : function () {
			if ($('.slideshow').length && $('.slideshow img').length > 1) {
				slideshow.s = $('.slideshow');
				slideshow.setup();
			}			
		}

    };

    return slideshow;

});