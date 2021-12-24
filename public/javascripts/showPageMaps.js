

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: camp.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(camp.geometry.coordinates)
    .addTo(map)

new mapboxgl.Popup({offset:25})
.setLngLat(camp.geometry.coordinates)
.setHTML(
    `<h3>${campground.title}</h3>`
    )
.addTo(map);