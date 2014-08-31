define('mapify', ['jquery'], 

	function ($) {
	'use strict';

    var mapify = {

    	long : 52.5075419,
    	lat : 13.4261419,
    	greenIcon : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    	blueIcon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    	postsArray : [],
    	markers : [],

    	mapOptions : function () {
    		var mapOptions;

    		mapOptions = {
				center: new google.maps.LatLng(mapify.long,mapify.lat),
				zoom: 12,
				disableDefaultUI: true
			};

			return mapOptions;
    	},

    	initMap : function () {

			google.maps.event.addDomListener(window, 'load', run());

			function run() {
				var map = new google.maps.Map($('.mymap')[0], mapify.mapOptions());
				mapify.map = map;
				$('.mymap').parents('.loading').removeClass('loading');

				mapify.reset();
				mapify.createPostsArray();
				mapify.createMarkers();
				mapify.placeMarkersOnMap(map);
				mapify.scroll();
			}			
		},

		reset : function () {
			$(window).unbind('scroll.mapify');
			mapify.postsArray = [];
			mapify.markers = [];
			mapify.breakScroll = false;
		},

    	createPostsArray : function () {
			$('.post').each(function() {
    			if ($(this).data('long') !== "" && $(this).data('lat') !== "") {
    				mapify.postsArray.push({
	    				obj: $(this), 
	    				top: $(this).offset().top,
	    				long: $(this).data('long'),
	    				lat: $(this).data('lat'),
	    				hex: $(this).data('hex'),
	    				title: $(this).find('h2 a').html()
	    			});	
    			}
    		});
		},

		createMarkers : function () {
	
			var marker,
				i,
				pinImage = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");

			for (i = 0; i < mapify.postsArray.length; i++) {
				
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(mapify.postsArray[i].long, mapify.postsArray[i].lat),
					map: mapify.map,
					title: mapify.postsArray[i].title,
					icon: pinImage
				});

	     		mapify.markers.push(marker);
			}			

		},

		placeMarkersOnMap : function (map) {

			var label,
				title,
				marker;

			for (var i = 0; i < mapify.markers.length; i++) {

				marker = mapify.markers[i];
				marker.setMap(map);				

				google.maps.event.addListener(marker, "click", function () {
					mapify.markerAnimation(this);
				});
			}
		},

		markerAnimation : function (marker) {

			var title = $('.map-title');
			title.html(marker.title);	

			mapify.resetMarkers();
			marker.setIcon(mapify.greenIcon);
			marker.setAnimation(google.maps.Animation.BOUNCE)
			window.setTimeout(function() {
				marker.setAnimation(null);
			}, 3000);

					
		},

		resetMarkers : function () {
			for (var i = 0; i < mapify.markers.length; i++) {
				mapify.markers[i].setAnimation(null)
				mapify.markers[i].setIcon(mapify.blueIcon);
			}			
		},

		panToMarker : function (long, lat) {
			var latlong = new google.maps.LatLng(long,lat),
				label;

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


		scroll : function () {

			var mapHolder = $('.mymap'),
				currentTopOfPage = $(window)[0].scrollY,
				i,
				topOfPage,
				post,
				marker;

			$(window).bind('scroll.mapify', function () {

				topOfPage = $(window)[0].scrollY;

    			if (currentTopOfPage < topOfPage) {
    				for (i = 0; i < mapify.postsArray.length; i ++) {

    					post = mapify.postsArray[i];
    					marker = mapify.markers[i];

    					// If maps edge bottom goes below post top
    					if (topOfPage > (post.top - 500) && !post.obj.hasClass('mapify')) {
							post.obj.addClass('mapify');
							mapify.panToMarker(post.long, post.lat);
							mapify.markerAnimation(marker);
							mapify.map.setOptions({styles: mapify.mapStyle(post.hex)});												
    					}
    				}
    			} else if (currentTopOfPage > topOfPage) {

    				for (i = 0; i < mapify.postsArray.length; i ++) {

						post = mapify.postsArray[i];
						marker = mapify.markers[i];

						// If map top goes above post bottom
    					if (topOfPage < (post.top + post.obj.height() - 200) && post.obj.hasClass('mapify')) {
    						post.obj.removeClass('mapify');	
							mapify.panToMarker(post.long, post.lat);
							mapify.markerAnimation(marker);
							mapify.map.setOptions({styles: mapify.mapStyle(post.hex)});
    					}
       				}
    			}

    			currentTopOfPage = topOfPage;
    		});
		},

		initOnResizeMap : function () {
			
			setTimeout(function(){
				mapify.initMap()
			}, 1200);
			
		},

		start : function () {

			if ($('.mymap').length) {
				mapify.initMap();
				mapify.initOnResizeMap();
			}
		}
    };

    return mapify;

});