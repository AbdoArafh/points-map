const showMap = (mapid = "map", initialCoords = [30, 31], initialZoom = 6) => {
  const map = L.map(mapid).setView(initialCoords, initialZoom);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/abdoarafh/cks4ojlbg4ncb18o4jy282kka/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      minZoom: 1,
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYWJkb2FyYWZoIiwiYSI6ImNrczRtcHFiNTFzcnMycHBqbHljenYyZWgifQ.HxnT-zA7MXy4ph9_TGcYZQ",
    }
  ).addTo(map);

  const primaryFontColor = "#41b883";
  const minRadius = 5;
  const maxRadius = 20 - minRadius;

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const requestsArray = data.map(element => element.requests);
      const max = Math.max(...requestsArray);
      data.forEach(el => {
        const circle = L.circleMarker([el.lat, el.long], {
          color: primaryFontColor,
          fillColor: "#ccf7e5",
          fillOpacity: 0.8,
          radius: (el.requests / max) * maxRadius + minRadius,
          weight: 1,
        }).addTo(map);

        // const movingCircle = L.circleMarker([30, 30], {
        //   color: primaryFontColor,
        //   fillColor: "#ccf7e5",
        //   fillOpacity: 0.8,
        //   radius: 10,
        //   weight: 1,
        // }).addTo(map);

        // const step = 0.01;

        // setInterval(() => {
        //   const latlng = movingCircle.getLatLng();
        //   const lat = latlng.lat;
        //   const lng = latlng.lng;
        //   movingCircle.setLatLng(L.latLng(lat + step, lng + step));
        // }, 100);
        //   circle.bindPopup(`requests: ${el.requests}`);

        circle.bindTooltip(
          `<div style="text-align: center"><h4 style="padding: 0; margin: 0;">Requests</h4><p style="color: ${primaryFontColor};padding: 0; margin: 0;">${el.requests}</p></div>`,
          {
            direction: "top",
          }
        );
      });
    });
};

const getDataArray = async (link = "data.json") => {
  const response = await fetch(link);
  const arr = await response.json();
  return arr;
};

// showMap("map");
