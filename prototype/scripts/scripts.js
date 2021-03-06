var map = L.map('map').setView([50.3755, -4.1427], 13);
    
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
	var historyIcon = L.icon({
		iconUrl: 'static/images/history.svg',
		iconSize: [32, 32],
		iconAnchor: [0 ,0],
		popupAnchor: [0, 0]
	});

    //add popup content for each feature
	function onEachFeature(feature, layer) {
        var popup = "<h2>" + feature.properties.title + "</h2>"
			if (feature.properties && feature.properties.popupContent) {
			popup += "<div class='container'><div class='content'>" + feature.properties.popupContent + "<br /></div>";
			}
			if (feature.properties && feature.properties.image) {
				popup += "<div class='image'><img class='popupImg' src='" + feature.properties.image + "' alt='" + feature.properties.altText + "'>"
            }
            if (feature.properties && feature.properties.altText) {
                popup += "<p>" + feature.properties.altText + "</p></div></div>";
            }
		layer.bindPopup(popup, {
			maxWidth:"auto"
		});
	}

//add layer of history points from geojson file
var historyLayer = L.geoJSON(historyFile, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: historyIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);