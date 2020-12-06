
mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzaW50ZXJuZXRhcHBsaWNhdGllcyIsImEiOiJja2licmo1emoxMmZlMnNsYzBwY2Rxajd1In0.cvAqJ01WzQGmcUoq2ElonA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [3.6448, 50.991], // starting position [lng, lat]
    zoom: 16 // starting zoom
});
