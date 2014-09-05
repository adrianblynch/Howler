define('lazyload', ['jquery'], 
    function ($) {
    'use strict';

    var lazyload = {

        imagesArray : [],

        ie9 : function () {
            if (navigator.appVersion.indexOf("MSIE 9") !== -1){

            }
        },

        reset : function () {
            $(window).unbind('scroll.lazyload');
            lazyload.imagesArray = [];
        },

        setImages : function () {

            var images = $('.lazy');

            images.each(function() {
                if (!$(this).hasClass('loaded')) {
                    lazyload.imagesArray.push({
                        obj: $(this),
                        source: $(this).data('src')
                    });
                }
            });


        },

        scroll : function () {

            var i, src, y;

            $(window).bind('scroll.lazyload', function () {      

                for (i = 0; i < lazyload.imagesArray.length; i++) {
                    y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    if (y + $(window).height() >= lazyload.imagesArray[i].obj.offset().top) {
                        src = lazyload.imagesArray[i].source;
                        lazyload.imagesArray[i].obj.attr('src', src);
                        lazyload.imagesArray[i].obj.addClass('loaded');
                    }
                }
            });
        },      

        start : function () {
            if ($('.lazy').length) {
                lazyload.reset();
                lazyload.setImages();
                lazyload.scroll();
            }
        }

    };

    return lazyload;

});