var map = L.map('map').fitWorld();
    
    //add base layer
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2tpcHN0ZXIyazIiLCJhIjoiY2tiMHpodjMxMDVwZTJ4bGM3eHJnZGY4NiJ9.rBy0ebZPuuE4H1WqLIGG4A', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);

    //define icon for marker
	var audioIcon = L.icon({
		iconUrl: 'static/images/speaker.svg',
		iconSize: [32, 32],
		iconAnchor: [0 ,0],
		popupAnchor: [0, 0]
	});

	//check for geolocation
	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(map)
	}

	function onLocationError(e) {
		var map = L.map('map').setView([50.3755, -4.1427], 13);;
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	map.locate({setView: true, watch: true, maxZoom: 14});



    //add popup content for each feature
	function onEachFeature(feature, layer) {
        var popupContent = "<h1>" + feature.properties.title + "</h3>"
        

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
        }
        
        if (feature.properties && feature.properties.audio) {
            popupContent += "<hr><audio controls src='" + feature.properties.audio + "'>Your browser does not support the<code>audio</code> element.</audio>"
		}
		
		if (feature.properties && feature.properties.image) {
			popupContent += "<hr><img class='popupImg' src='" + feature.properties.image + "' alt='" + feature.properties.altText + "'>"
		}

		layer.bindPopup(popupContent);
	}

	var audioFile = L.geoJSON(audioFile, {

		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: audioIcon});
		},

		onEachFeature: onEachFeature
	}).addTo(map);
