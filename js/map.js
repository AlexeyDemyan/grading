import { renderPopup } from './render-popup.js';

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

const createPinIcon = (pinIconData) => {
  const pinIcon = L.icon({
    iconUrl: pinIconData.iconUrl,
    iconSize: [pinIconData.iconWidth, pinIconData.iconHeight],
    iconAnchor: [pinIconData.iconWidth/2, pinIconData.iconHeight]
  });

  return pinIcon;
};

const createPinMarker = (icon, position, isDraggable) => {
  const pinMarker = L.marker(
    {
      lat: position.lat,
      lng: position.lng,
    },
    {
      draggable: isDraggable,
      icon: icon
    }
  );

  return pinMarker;
};

const mainPinIcon = createPinIcon(MAIN_PIN_ICON_DATA);
const verifiedPinIcon = createPinIcon(VERIFIED_PIN_ICON_DATA);

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

const addMarkersToMap = (elements, markerGroup) => {
  elements.forEach((element) => {
    if (element.coords) {
      if (element.isVerified === false) {
        const marker = createPinMarker(mainPinIcon, element.coords, false);
        marker.addTo(markerGroup).bindPopup(renderPopup(element));
      }
      else {
        const marker = createPinMarker(verifiedPinIcon, element.coords, false);
        marker.addTo(markerGroup).bindPopup(renderPopup(element));
      }
    }
  });
};

export { createInteractiveMap, addMarkersToMap }
