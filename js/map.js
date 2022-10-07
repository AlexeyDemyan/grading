// import { renderOfferCard } from './get-offers.js';

const libba = () => {
  console.log('libba');
}

const MAP_ELEMENT_ID = 'map';

const MAIN_PIN_ICON_DATA = {
  iconUrl: './img/pin.svg',
  iconWidth: 52,
  iconHeight: 52
};

const VERIFIED_PIN_ICON_DATA = {
  iconUrl: './img/pin-verified.svg',
  iconWidth: 52,
  iconHeight: 52
};

const INITIAL_MAP_POSITION = {
  lat: 59.92749,
  lng: 30.31127,
  scale: 10,
};

const createInteractiveMap = () => {
  const map = L.map(MAP_ELEMENT_ID)
    .on('load', libba)
    .setView({
      lat: INITIAL_MAP_POSITION.lat,
      lng: INITIAL_MAP_POSITION.lng,
    }, INITIAL_MAP_POSITION.scale);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};

// const INITIAL_MAIN_MARKER_POSITION = {
//   lat: 35.66560,
//   lng: 139.79112
// };

// const ADDRESS_PRECISION = 5;
// const addressElement = document.querySelector('#address');
// const fillInAddressValue = (address) => {
//   addressElement.value = `lat: ${address.lat.toFixed(ADDRESS_PRECISION)}, lng: ${address.lng.toFixed(ADDRESS_PRECISION)}`;
// };

// const createPinIcon = (pinIconData) => {
//   const pinIcon = L.icon({
//     iconUrl: pinIconData.iconUrl,
//     iconSize: [pinIconData.iconWidth, pinIconData.iconHeight],
//     iconAnchor: [pinIconData.iconWidth/2, pinIconData.iconHeight]
//   });

//   return pinIcon;
// };

// const createPinMarker = (icon, position, isDraggable) => {
//   const pinMarker = L.marker(
//     {
//       lat: position.lat,
//       lng: position.lng,
//     },
//     {
//       draggable: isDraggable,
//       icon: icon
//     }
//   );

//   return pinMarker;
// };

// const mainPinIcon = createPinIcon(MAIN_PIN_ICON_DATA);
// const extraPinIcon = createPinIcon(EXTRA_PIN_ICON_DATA);
// const mainPinMarker = createPinMarker(mainPinIcon, INITIAL_MAIN_MARKER_POSITION, true);

// const resetMainMarkerPosition = () => {
//   mainPinMarker.setLatLng({
//     lat: INITIAL_MAIN_MARKER_POSITION.lat,
//     lng: INITIAL_MAIN_MARKER_POSITION.lng,
//   });
//   fillInAddressValue(INITIAL_MAIN_MARKER_POSITION);
// };

// const createInteractiveMap = () => {
//   const map = L.map(MAP_ELEMENT_ID)
//     .on('load', makePageActive)
//     .setView({
//       lat: INITIAL_MAP_POSITION.lat,
//       lng: INITIAL_MAP_POSITION.lng,
//     }, INITIAL_MAP_POSITION.scale);

//   L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//   ).addTo(map);

//   mainPinMarker.addTo(map);
//   fillInAddressValue(mainPinMarker.getLatLng());

//   mainPinMarker.on('moveend', (evt) => {
//     const coordinates = evt.target.getLatLng();
//     fillInAddressValue(coordinates);
//   });

//   return map;
// };

// const addMarkersToMap = (elements, markerGroup) => {
//   elements.forEach((element) => {
//     const customMarker = createPinMarker(extraPinIcon, element.location, false);
//     customMarker.addTo(markerGroup).bindPopup(renderOfferCard(element));
//   });
// };

// export { createInteractiveMap, createPinIcon, createPinMarker, resetMainMarkerPosition, addMarkersToMap };

export { createInteractiveMap }
