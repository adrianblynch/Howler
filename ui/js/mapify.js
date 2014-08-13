define('mapify', ['jquery'], 

	function ($) {
	'use strict';

	//TODO:
	/*

	Save markers in array and populate map from beginning
	When new posts load - repopulate map

	*/

    var mapify = {

    	long : 52.5075419,
    	lat : 13.4261419,

    	mapOptions : function () {
    		var mapOptions;

    		mapOptions = {
				center: new google.maps.LatLng(mapify.long,mapify.lat),
				zoom: 12,
				disableDefaultUI: true
			};

			return mapOptions;
    	},

    	markers : [],

		marker : function (long, lat, title) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(long,lat),
				map: mapify.map,
				title:title,
        		//animation: google.maps.Animation.DROP,
			});

			mapify.markerLabel(marker, title);

		},

		markerLabel : function (marker, title) {
			var label = new google.maps.InfoWindow({
       			content: title
 			});

 			label.open(mapify.map, marker);
 			window.setTimeout(function() {label.close(mapify.map, marker);}, 1500);
     		google.maps.event.addListener(marker, "click", function () { label.open(mapify.map, this); });
		},

		setNewPlace : function (long, lat, title) {
			var latlong = new google.maps.LatLng(long,lat);
			mapify.marker(long, lat, title);
			mapify.map.panTo(latlong);
		},

		mapStyle : function (hex) {
			var style = [
				{
					featureType: "all",
					stylers: [
						{ hue: hex },
						{ saturation: -50 }
					]
				},{
					featureType: "road.arterial",
					elementType: "geometry",
					stylers: [
						{ hue: hex },
						{ saturation: 0 }
					]
				}
			];

			return style;
		},


    	initMap : function () {

			google.maps.event.addDomListener(window, 'load', run());

			function run() {
				var map = new google.maps.Map($('.mymap')[0], mapify.mapOptions());
				mapify.map = map;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(mapify.long,mapify.lat),
					map: mapify.map
				});

				mapify.markerLabel(marker, 'Berlin');
				mapify.map.setOptions({styles: mapify.mapStyle("#bbbbbb")});
				$('.mymap').parents('.loading').removeClass('loading');
				mapify.setup();
			}
		},

		setup : function () {
			mapify.reset();
			mapify.setPosts();
			mapify.scroll();
		},

		reset : function () {
			$(window).unbind('scroll.mapify');
			mapify.postsArray = [];
			mapify.breakScroll = false;
		},

    	setPosts : function () {

    		$('.post').each(function() {
    			mapify.postsArray.push({
    				obj: $(this), 
    				top: $(this).offset().top,
    				long: $(this).data('long'),
    				lat: $(this).data('lat'),
    				hex: $(this).data('hex'),
    				title: $(this).find('h2').html()
    			});
    		});
		},

		scroll : function () {

			var ths = this,
				mapHolder = $('.mymap'),
				currentScrollY = $(window)[0].scrollY,
				i;

			$(window).bind('scroll.mapify', function () {
    			if (currentScrollY < $(window)[0].scrollY) {
    				for (i = 0; i < ths.postsArray.length; i ++) {
    					if ($(window)[0].scrollY > (ths.postsArray[i].top - 500) && !ths.postsArray[i].obj.hasClass('mapify')) {
							ths.postsArray[i].obj.addClass('mapify');
							mapify.setNewPlace(ths.postsArray[i].long, ths.postsArray[i].lat, ths.postsArray[i].title);
							mapify.map.setOptions({styles: mapify.mapStyle(ths.postsArray[i].hex)});
    					}
    				}
    			} else if (currentScrollY > $(window)[0].scrollY) {
    				for (i = 0; i < ths.postsArray.length; i ++) {
    					if ($(window)[0].scrollY < (ths.postsArray[i].top - mapHolder.height()) && ths.postsArray[i].obj.hasClass('mapify')) {
    						ths.postsArray[i].obj.removeClass('mapify');	
    						if (i > 0){
    							mapify.setNewPlace(ths.postsArray[i-1].long, ths.postsArray[i-1].lat, ths.postsArray[i-1].title);
    							mapify.map.setOptions({styles: mapify.mapStyle(ths.postsArray[i].hex)});
    						} 
    					}
    				}
    			}

    			currentScrollY = $(window)[0].scrollY;
    		});
		},

		start : function () {

			if ($('.mymap').length) {
				mapify.initMap();
				
			}
		}
    };

    return mapify;

});