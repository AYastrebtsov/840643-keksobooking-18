'use strict';

var LOCATIONS_AMOUNT = 8;
var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var GALLERY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE = 1000;
var ADDRESS_X = 600;
var ADDRESS_Y = 350;
var ROOMS = 1;
var AMOUNT = 30;
var X_MAX_COORDINATE = document.querySelector('.map__overlay').offsetWidth;
var Y_MIN_COORDINATE = 130;
var Y_MAX_COORDINATE = 630;
var X_OFFSET = 25;
var Y_OFFSET = 70;


function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomArrayLength = function (array) {

  var featuresSet = [];
  var randomLength = getRandomNumber(1, array.length);

  while (featuresSet.length < randomLength) {
    var elementNumber = getRandomNumber(0, array.length);
    if (!featuresSet.includes(array[elementNumber])) {
      featuresSet.push(array[elementNumber]);
    }
  }
  return featuresSet;
};

var createLocation = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, LOCATIONS_AMOUNT) + '.png'
    },
    offer: {
      title: 'заголовок объявления',
      address: (getRandomNumber(0, ADDRESS_X) + getRandomNumber(0, ADDRESS_Y)),
      price: getRandomNumber(0, PRICE),
      type: ACCOMODATION_TYPE[getRandomNumber(0, ACCOMODATION_TYPE.length)],
      rooms: getRandomNumber(ROOMS, AMOUNT),
      guests: getRandomNumber(0, AMOUNT),
      checkin: CHECKIN_TIMES[getRandomNumber(0, CHECKIN_TIMES.length)],
      checkout: CHECKIN_TIMES[getRandomNumber(0, CHECKIN_TIMES.length)],
      features: randomArrayLength(FEATURES_ITEMS),
      description: 'описание',
      photos: randomArrayLength(GALLERY)
    },
    location: {
      x: getRandomNumber(0, X_MAX_COORDINATE) - X_OFFSET + 'px',
      y: getRandomNumber(Y_MIN_COORDINATE, Y_MAX_COORDINATE) - Y_OFFSET + 'px'
    }
  };
};

var getLocations = function () {

  var locations = [];

  for (var j = 0; j < LOCATIONS_AMOUNT; j++) {
    locations.push(createLocation());
  }
  return locations;
};

var visualizePins = function (locations) {

  var fragment = document.createDocumentFragment();

  for (var f = 0; f < LOCATIONS_AMOUNT; f++) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = locations[f].location.x;
    pin.style.top = locations[f].location.y;

    pin.querySelector('.map__pin img').setAttribute('src', locations[f].author.avatar);
    pin.querySelector('.map__pin img').setAttribute('alt', locations[f].offer.title);
    fragment.appendChild(pin);
  }

  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.map__pins').appendChild(fragment);
};

var disableArray = function (array) {

  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
  }
};

var enableArray = function (array) {

  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled', 'disabled');
  }
};

var FIELDSETS = document.querySelectorAll('fieldset');
var SELECTS = document.querySelectorAll('select');

var disablePage = function () {
  document.querySelector('.map__filters').classList.add('ad-form--disabled');

  disableArray(FIELDSETS);
  disableArray(SELECTS);
};

var activatePage = function () {
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  enableArray(FIELDSETS);
  enableArray(SELECTS);
  visualizePins(getLocations());
};

var getPosition = function () {
  var soughtPin = document.querySelector('.map__pin--main');
  var pinCoordinateX = parseInt(soughtPin.style.left, 10);
  var pinCoordinateY = parseInt(soughtPin.style.top, 10);
  var coordinates = [pinCoordinateX, pinCoordinateY];

  return coordinates;
};

var writeDownCoordinates = function () {
  var pinLocation = getPosition();
  var coordinatesField = document.querySelector('#address');
  coordinatesField.value = 'x: ' + pinLocation[0] + '; ' + 'y: ' + pinLocation[1] + ';';
};

document.addEventListener('DOMContentLoaded', writeDownCoordinates);

var minPin = document.querySelector('.map__pin--main');
minPin.addEventListener('mousedown', activatePage, {once: true});
minPin.addEventListener('mousedown', writeDownCoordinates);
minPin.addEventListener('keydown', activatePage, {once: true});
minPin.addEventListener('keydown', writeDownCoordinates);


var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');

var compare = function () {
  if (rooms.selectedIndex === 0 && guests.selectedIndex === 2) {
    rooms.setCustomValidity('');
  } else if (rooms.selectedIndex === 1 && guests.selectedIndex === 1 || rooms.selectedIndex === 1 && guests.selectedIndex === 2) {
    rooms.setCustomValidity('');
  } else if (rooms.selectedIndex === 2 && guests.selectedIndex === 0 || rooms.selectedIndex === 2 && guests.selectedIndex === 1 || rooms.selectedIndex === 2 && guests.selectedIndex === 2) {
    rooms.setCustomValidity('');
  } else if (rooms.selectedIndex === 3 && guests.selectedIndex === 3) {
    rooms.setCustomValidity('');
  } else {
    rooms.setCustomValidity('Такой вариант аренды недоступен');
  }

};

rooms.addEventListener('change', compare);


disablePage();


