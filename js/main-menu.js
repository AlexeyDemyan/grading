import { createInteractiveMap, addMarkersToMap } from './map.js';

const buyButton = document.querySelector('#button-buy');
const sellButton = document.querySelector('#button-sell');
const showMapButton = document.querySelector('#button-map');
const showListButton = document.querySelector('#button-list');
const usersListElement = document.querySelector('.users-list');
const mapContainerElement = document.querySelector('.map-container');

const makeSellOrBuyButtonActive = (button) => {
  buyButton.classList.remove('is-active');
  sellButton.classList.remove('is-active');
  button.classList.add('is-active');
};

const makeListOrMapButtonActive = (button) => {
  showMapButton.classList.remove('is-active');
  showListButton.classList.remove('is-active');
  button.classList.add('is-active');
};

const chooseToBuyHandler = () => {
  buyButton.addEventListener('click', () => {
    makeSellOrBuyButtonActive(buyButton);
  });
};

const chooseToSellHandler = () => {
  sellButton.addEventListener('click', () => {
    makeSellOrBuyButtonActive(sellButton);
  });
};

const showMapHandler = (elements) => {
  showMapButton.addEventListener('click', () => {
    makeListOrMapButtonActive(showMapButton);
    usersListElement.style.display = 'none';
    mapContainerElement.style.display = 'block';
    const map = createInteractiveMap();
    const markerGroup = L.layerGroup().addTo(map);
    addMarkersToMap(elements, markerGroup);
  });
};

const showListHandler = () => {
  showListButton.addEventListener('click', () => {
    makeListOrMapButtonActive(showListButton);
    mapContainerElement.style.display = 'none';
    usersListElement.style.display = 'block';
  });
};

export { chooseToSellHandler, chooseToBuyHandler, showMapHandler, showListHandler };
