class PointsMap {
  constructor(
    mapid,
    jsonLink,
    { isDarkMode = true, primaryColor = "#f90", fillOpacity = 0.8 }
  ) {
    this.map = L.map(mapid, { center: [0, 0], zoom: 1 });
    this.jsonLink = jsonLink;
    this.data = [];
    this.circleMarkers = [];
    this.minRadius = 5;
    this.maxRadius = 15;
    this.isDarkMode = isDarkMode;
    this.primaryColor = primaryColor;
    this.fillOpacity = fillOpacity;
    this.updateDataArray = this.updateDataArray.bind(this);
    this.fitBounds = this.fitBounds.bind(this);
    this.showData = this.showData.bind(this);
    this.setMinAndMaxRadius = this.setMinAndMaxRadius.bind(this);
    this.setMode = this.setMode.bind(this);
    this.showMap = this.showMap.bind(this);
  }

  showMap() {
    this.tileLayer = L.tileLayer(
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
    this.tileLayer.addTo(this.map);
    this.setMode(this.isDarkMode ? "dark" : "light");
    this.updateDataArray();
  }

  setMinAndMaxRadius(minr, maxr) {
    this.minRadius = minr;
    this.maxRadius = maxr;
    this.circleMarkers = [];
    this.showData();
  }

  showData() {
    const requests = this.data.map(element => element.requests);
    const maxRequest = Math.max(...requests);

    this.circleMarkers = this.data.map(el => {
      const circle = L.circleMarker([el.lat, el.long], {
        fillColor: this.primaryColor,
        fillOpacity: this.fillOpacity,
        radius: (el.requests / maxRequest) * this.maxRadius + this.minRadius,
        weight: 0,
      }).addTo(this.map);

      circle.bindTooltip(
        `<div style="text-align: center"><h4 style="padding: 0; margin: 0;">Requests</h4><p style="color: ${this.primaryColor};padding: 0; margin: 0;">${el.requests}</p></div>`,
        {
          direction: "top",
        }
      );
      return circle;
    });
  }

  updateDataArray() {
    fetch(this.jsonLink)
      .then(response => response.json())
      .then(data => (this.data = data))
      .then(() => this.fitBounds())
      .then(() => this.showData());
  }

  fitBounds() {
    const areasLat = this.data.map(element => element.lat);
    const areasLng = this.data.map(element => element.long);
    const topLeftCorner = L.latLng(
      Math.min(...areasLat),
      Math.min(...areasLng)
    );
    const bottomRightCorner = L.latLng(
      Math.max(...areasLat),
      Math.max(...areasLng)
    );
    this.map.fitBounds(L.latLngBounds(topLeftCorner, bottomRightCorner));
  }

  avg(arr) {
    return arr.reduce((acc, curr) => acc + curr) / arr.length;
  }

  setMode(mode) {
    this.isDarkMode = mode === "dark";
    if (this.isDarkMode)
      this.tileLayer.setUrl(
        "https://api.mapbox.com/styles/v1/abdoarafh/cks4ojlbg4ncb18o4jy282kka/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}"
      );
    else
      this.tileLayer.setUrl(
        "https://api.mapbox.com/styles/v1/abdoarafh/cks93mkwf293m17o3p5309fkq/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}"
      );
  }
}
