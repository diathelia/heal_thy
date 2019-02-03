/**
 * Created by yawno on 25/11/2017.
 */
window.addEventListener("load", function() {
  // mapbox tiler and general map-click function.
  var mymap = L.map("mapid").setView([-45.87517, 170.48997], 14); // -45.864863, 170.547380 (harbour shot)

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 25,
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: "mapbox.streets"
    }
  ).addTo(mymap);

  L.marker([-45.872106, 170.502849])
    .addTo(mymap)
    .bindPopup("Emergency Doctors 8am - 10pm")
    .openPopup();

  L.marker([-45.8676914, 170.4889796])
    .addTo(mymap) // -45.86805, 170.48836 centre of plot 271 from google: -45.867636, 170.488915 //
    .bindPopup("&#10024; Find us here! &#10024;")
    .openPopup();

  var popup = L.popup({ maxHeight: 300 });

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
  }
  mymap.on("click", onMapClick);
});

/* calculating leaflet's 'dynamic' coordinates:

actual location in 1.3.1 update:

    Firefox github.io (-45.868049, 170.488459)
            visual SC (-45.868052, 170.488365) ✓

    Chrome  github.io (-45.868034, 170.488328)
            visual SC (-45.868051, 170.488361) ✓

Seems like https / host location somehow ?
*/
