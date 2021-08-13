# Points Map

this is a points map made to display json data about shipping requests

### Quick Start

#### Imports

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""
/>
<script
  src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
  crossorigin=""
></script>
```

#### HTML

```html
<div id="mapId"></div>
```

#### JS

```js
const map = new Map(mapId, jsonDataUrl, Options);
map.showMap();
```

### Arguments Details

| Argument Name | type   | default | details                                |
| ------------- | ------ | ------- | -------------------------------------- |
| `mapId`       | string | --      | you set it as you like 😁              |
| `jsonDataUrl` | string | --      | the Url to fetch/request the data from |

### Options

| Argument Name  | type    | default | details                                                  |
| -------------- | ------- | ------- | -------------------------------------------------------- |
| `isDarkMode`   | boolean | true    | set it to true to enable dark mode                       |
| `primaryColor` | string  | "#f90"  | the color of the circle marker and font color of tooltip |
| `fillOpacity`  | number  | 0.8     | decides the fill opacity of the circle marker            |

### Methods

- `map.setMinAndMaxRadius($minRadius, $maxRadius)` self describing. but just in case this sets the circle marker minimum and maximum radius.
- `map.showData()` showes the data that you added the url for regularly you don't need to call it
- `map.setMode($mode)` mode is string which is just "light" or "dark" and sets the mode of the map
- `map.showMap()` obviously shows the map

> Live demo on github pages [here](https://abdoarafh.github.io/points-map/)
