define('movingmap', ['jquery'], 

	function ($) {
	'use strict';

    var movingmap = {

    	long : 52.5075419,
    	lat : 13.4261419,
    	greenIcon : "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    	blueIcon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    	postsArray : [],
    	markers : [],

    	mapOptions : function () {
    		var mapOptions;

    		mapOptions = {
				center: new google.maps.LatLng(movingmap.long,movingmap.lat),
				zoom: 12,
				disableDefaultUI: true
			};

			return mapOptions;
    	},

    	initMap : function () {

			google.maps.event.addDomListener(window, 'load', run());

			function run() {
				var map = new google.maps.Map($('.mymap')[0], movingmap.mapOptions());
				movingmap.map = map;
				$('.mymap').parents('.loading').removeClass('loading');

				movingmap.reset();
				movingmap.createPostsArray();
				movingmap.createMarkers();
				movingmap.placeMarkersOnMap(map);
				movingmap.scroll();
			}			
		},

		reset : function () {
			$(window).unbind('scroll.movingmap');
			movingmap.postsArray = [];
			movingmap.markers = [];
			movingmap.breakScroll = false;
		},

    	createPostsArray : function () {
			$('.post').each(function() {
    			if ($(this).data('long') !== "" && $(this).data('lat') !== "") {
    				movingmap.postsArray.push({
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

			for (i = 0; i < movingmap.postsArray.length; i++) {
				
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(movingmap.postsArray[i].long, movingmap.postsArray[i].lat),
					map: movingmap.map,
					title: movingmap.postsArray[i].title,
					icon: pinImage
				});

	     		movingmap.markers.push(marker);
			}			

		},

		placeMarkersOnMap : function (map) {

			var label,
				title,
				marker;

			for (var i = 0; i < movingmap.markers.length; i++) {

				marker = movingmap.markers[i];
				marker.setMap(map);				

				google.maps.event.addListener(marker, "click", function () {
					movingmap.markerAnimation(this);
				});
			}
		},

		markerAnimation : function (marker) {

			var title = $('.map-title');
			title.html(marker.title);	

			movingmap.resetMarkers();
			marker.setIcon(movingmap.greenIcon);
			marker.setAnimation(google.maps.Animation.BOUNCE)
			window.setTimeout(function() {
				marker.setAnimation(null);
			}, 3000);

					
		},

		resetMarkers : function () {
			for (var i = 0; i < movingmap.markers.length; i++) {
				movingmap.markers[i].setAnimation(null)
				movingmap.markers[i].setIcon(movingmap.blueIcon);
			}			
		},

		panToMarker : function (long, lat) {
			var latlong = new google.maps.LatLng(long,lat),
				label;

			movingmap.map.panTo(latlong);

			
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

			$(window).bind('scroll.movingmap', function () {

				topOfPage = $(window)[0].scrollY;

    			if (currentTopOfPage < topOfPage) {
    				for (i = 0; i < movingmap.postsArray.length; i ++) {

    					post = movingmap.postsArray[i];
    					marker = movingmap.markers[i];

    					// If maps edge bottom goes below post top
    					if (topOfPage > (post.top - 500) && !post.obj.hasClass('movingmap')) {
							post.obj.addClass('movingmap');
							movingmap.panToMarker(post.long, post.lat);
							movingmap.markerAnimation(marker);
							movingmap.map.setOptions({styles: movingmap.mapStyle(post.hex)});												
    					}
    				}
    			} else if (currentTopOfPage > topOfPage) {

    				for (i = 0; i < movingmap.postsArray.length; i ++) {

						post = movingmap.postsArray[i];
						marker = movingmap.markers[i];

						// If map top goes above post bottom
    					if (topOfPage < (post.top + post.obj.height() - 200) && post.obj.hasClass('movingmap')) {
    						post.obj.removeClass('movingmap');	
							movingmap.panToMarker(post.long, post.lat);
							movingmap.markerAnimation(marker);
							movingmap.map.setOptions({styles: movingmap.mapStyle(post.hex)});
    					}
       				}
    			}

    			currentTopOfPage = topOfPage;
    		});
		},

		initOnResizeMap : function () {
			
			setTimeout(function(){
				movingmap.initMap()
			}, 1200);
			
		},

		start : function () {

			if ($('.mymap').length) {
				movingmap.initMap();
				movingmap.initOnResizeMap();
			}
		}
    };

    return movingmap;

});