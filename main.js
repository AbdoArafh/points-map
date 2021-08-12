let map;

const switchMode = () => {
  if (darkMode)
    tileLayer.setUrl(
      "https://api.mapbox.com/styles/v1/abdoarafh/cks4ojlbg4ncb18o4jy282kka/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}"
    );
  else
    tileLayer.setUrl(
      "https://api.mapbox.com/styles/v1/abdoarafh/cks93mkwf293m17o3p5309fkq/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}"
    );
};

const showMap = (mapid = "map", initialCoords = [0, 0], initialZoom = 1) => {
  map = L.map(mapid, { center: initialCoords, zoom: initialZoom });

  tileLayer = L.tileLayer(
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
  );

  tileLayer.addTo(map);

  getDataArray()
    .then(data => fitBounds(data))
    .then(data => showData(data));
};

const showData = data => {
  const primaryFontColor = "#41b883";
  const minRadius = 5;
  const maxRadius = 20 - minRadius;
  const requests = data.map(element => element.requests);
  const maxRequest = Math.max(...requests);

  data.forEach(el => {
    const circle = L.circleMarker([el.lat, el.long], {
      color: primaryFontColor,
      fillColor: "#ff9900",
      fillOpacity: 0.8,
      radius: (el.requests / maxRequest) * maxRadius + minRadius,
      weight: 0,
    }).addTo(map);

    circle.bindTooltip(
      `<div style="text-align: center"><h4 style="padding: 0; margin: 0;">Requests</h4><p style="color: ${primaryFontColor};padding: 0; margin: 0;">${el.requests}</p></div>`,
      {
        direction: "top",
      }
    );
  });
};

const fitBounds = data => {
  const areasLat = data.map(element => element.lat);
  const areasLng = data.map(element => element.long);
  const topLeftCorner = L.latLng(Math.min(...areasLat), Math.min(...areasLng));
  const bottomRightCorner = L.latLng(
    Math.max(...areasLat),
    Math.max(...areasLng)
  );
  map.fitBounds(L.latLngBounds(topLeftCorner, bottomRightCorner));
  return data;
};

const getDataArray = async (link = "data.json") => {
  const response = await fetch(link);
  const arr = await response.json();
  return arr;
};

const avg = arr => arr.reduce((acc, curr) => acc + curr) / arr.length;

// showMap("map");
